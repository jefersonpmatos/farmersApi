// No arquivo routes/dataRoutes.ts
import express, { Request, Response } from "express";
import FarmerController from "../controllers/farmer.controller";
import FarmerMiddlewares from "../middlewares/farmer.middlewares";

const router = express.Router();

router.get("/farmers", FarmerController.getAllFarmers);
router.post(
  "/farmer/register",
  FarmerMiddlewares.validateRegisterFarmerData,
  (req: Request, res: Response) => {
    FarmerController.registerFarmer(req, res);
  }
);
router.put("/farmer/:id", FarmerController.editFarmer);
router.delete("/farmer/:id", FarmerController.deleteFarmer);

export default router;
