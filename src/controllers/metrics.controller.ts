import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class DashboardMetricsController {
  async getDashboardMetrics(req: Request, res: Response): Promise<void> {
    try {
      // Total de fazendas em quantidade
      const totalFarms = await prisma.farmer.count();

      const totalFarmsArea = await prisma.farmer.aggregate({
        _sum: {
          totalAreaHectares: true,
          cultivableAreaHectares: true,
          vegetationAreaHectares: true,
        },
      });

      const farmsByState = await prisma.farmer.groupBy({
        by: ["state"],
        _count: {
          _all: true,
        },
        _sum: {
          totalAreaHectares: true,
          cultivableAreaHectares: true,
          vegetationAreaHectares: true,
        },
      });

      const cropsDistribution = await prisma.crop.groupBy({
        by: ["name"],
        _count: {
          _all: true,
        },
      });

      const totalCrops = cropsDistribution.reduce(
        (acc: number, crop: any) => acc + crop._count._all,
        0
      );

      const cropsTotal = {
        totalCrops,
        crops: cropsDistribution.map((crop: any) => ({
          name: crop.name,
          totalFarms: crop._count._all,
        })),
      };

      const totalFarmsByState = farmsByState.map((state: any) => ({
        state: state.state,
        totalFarms: state._count._all,
        totalArea: state._sum.totalAreaHectares,
        totalCultivableArea: state._sum.cultivableAreaHectares,
        totalVegetationArea: state._sum.vegetationAreaHectares,
        totalCrops: state._sum.totalCropsByState,
      }));

      const stateWithMostFarms = farmsByState.reduce(
        (maxState: any, state: any) =>
          state._count._all > maxState._count._all ? state : maxState
      );

      const stateWithLessFarms = farmsByState.reduce(
        (minState: any, state: any) =>
          state._count._all < minState._count._all ? state : minState
      );

      const dashboardMetrics = {
        totalFarms,
        totalArea: totalFarmsArea._sum.totalAreaHectares,
        cultivableAreaHectares: totalFarmsArea._sum.cultivableAreaHectares,
        vegetationAreaHectares: totalFarmsArea._sum.vegetationAreaHectares,
        totalNumberOfStates: farmsByState.length,
        stateWithMostFarms: stateWithMostFarms.state,
        stateWithLessFarms: stateWithLessFarms.state,
        totalFarmsByState,
        totalCrops: cropsTotal.totalCrops,
        crops: cropsTotal.crops,
      };

      res.status(200).json(dashboardMetrics);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao obter métricas do dashboard", error });
    }
  }
}

export default new DashboardMetricsController();
