import { Router } from "express";
import { IDnaController } from "../../controllers/DnaController";
import { IReportController } from "../../controllers/ReportController";

export default function initializeDnaRoutes(
  dnaController: IDnaController,
  reportController: IReportController
): Router {
  const router = Router();

  router.post("/", (req, res, next) => {
    try {
      const { dna } = req.body;
      let statusCode: number;
      const isAnomaly = dnaController.isAnomaly(dna);

      if (isAnomaly) {
        statusCode = 200;
        reportController.createReportWithAnomaly();
      } else {
        statusCode = 403;
        reportController.createReportWhitoutAnomaly();
      }
      res.status(statusCode).json({});
    } catch (error) {
      next(error);
    }
  });

  return router;
}
