import { Request, Response } from "express";
import { Farmer } from "../models/farmer.model";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class FarmerController {
  async registerFarmer(req: Request, res: Response): Promise<void> {
    try {
      const {
        cpfCnpj,
        name,
        farmName,
        city,
        state,
        totalAreaHectares,
        cultivableAreaHectares,
        vegetationAreaHectares,
        crops,
      } = req.body;

      const cleanCPFCNPJ: string = cpfCnpj.replace(/\D/g, "");

      if (
        !cpfCnpj ||
        !name ||
        !farmName ||
        !city ||
        !state ||
        !totalAreaHectares ||
        !cultivableAreaHectares ||
        !vegetationAreaHectares ||
        !crops
      ) {
        res.status(400).json({ message: "Dados incompletos" });
        return;
      }

      const isFarmerRegistered = await prisma.farmer.findFirst({
        where: {
          cpfCnpj: cleanCPFCNPJ,
        },
      });

      if (isFarmerRegistered) {
        res.status(400).json({ message: "CPF ou CPNJ ja cadastrado" });
        return;
      }

      if (!isFarmerRegistered) {
        const newFarmer: Farmer = await prisma.farmer.create({
          data: {
            cpfCnpj: cleanCPFCNPJ,
            name,
            farmName,
            city,
            state,
            totalAreaHectares,
            cultivableAreaHectares,
            vegetationAreaHectares,
            crops: {
              create: crops.map((name: string) => ({ name })),
            },
          },
          include: {
            crops: true,
          },
        });

        res.status(201).json({
          message: "Agricultor cadastrado com sucesso",
          data: newFarmer,
        });
      }
    } catch (error) {
      res.status(500).json({ message: "Erro ao cadastrar dados", error });
    }
  }
  async editFarmer(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({ message: "ID do agricultor é obrigatório" });
        return;
      }

      const {
        name,
        farmName,
        city,
        state,
        totalAreaHectares,
        cultivableAreaHectares,
        vegetationAreaHectares,
        crops,
      } = req.body;

      const existingFarmer = await prisma.farmer.findUnique({
        where: {
          id: Number(id),
        },
        include: {
          crops: true,
        },
      });

      if (!existingFarmer) {
        res.status(404).json({ message: "Agricultor não encontrado" });
        return;
      }

      const updatedFarmer: Farmer = await prisma.farmer.update({
        where: {
          id: Number(id),
        },
        data: {
          name,
          farmName,
          city,
          state,
          totalAreaHectares,
          cultivableAreaHectares,
          vegetationAreaHectares,
          crops: crops && {
            create: crops.map((name: string) => ({ name })),
          },
        },
        include: {
          crops: true,
        },
      });

      res.status(200).json({
        message: "Agricultor atualizado com sucesso",
        data: updatedFarmer,
      });
    } catch (error) {
      res.status(500).json({ message: "Erro ao editar dados", error });
    }
  }

  async deleteFarmer(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({ message: "ID do agricultor é obrigatório" });
        return;
      }

      const existingFarmer = await prisma.farmer.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!existingFarmer) {
        res.status(404).json({ message: "Agricultor não encontrado" });
        return;
      }

      await prisma.farmer.delete({
        where: {
          id: Number(id),
        },
      });

      res.status(200).json({
        message: "Agricultor excluído com sucesso",
        data: existingFarmer,
      });
    } catch (error) {
      console.error("Erro ao excluir agricultor:", error);
      res.status(500).json({ message: "Erro ao excluir agricultor", error });
    }
  }
}

export default new FarmerController();
