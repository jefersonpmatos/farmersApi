// No arquivo routes.ts
import express from "express";
import farmerRoutes from "./farmerRoutes";
import metricsRoutes from "./metricsRoutes";

const router = express.Router();

router.use(farmerRoutes);
router.use(metricsRoutes);

export default router;
