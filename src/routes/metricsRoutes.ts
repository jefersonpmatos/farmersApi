// No arquivo routes/dataRoutes.ts
import express, { Request, Response } from "express";
import MetricsController from "../controllers/metrics.controller";

const router = express.Router();

router.get("/metrics", MetricsController.getDashboardMetrics);

export default router;
