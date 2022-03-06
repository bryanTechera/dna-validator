import { Router } from "express";
import { IReportController } from "../../controllers/ReportController";

export default function initializeReportRoutes(
  controller: IReportController
): Router {
  const router = Router();

  router.get("/", async (_, res, next) => {
    try {
      const sumary = await controller.getSummaryReport();
      res.json(sumary);
    } catch (error) {
      next(error);
    }
  });

  return router;
}
