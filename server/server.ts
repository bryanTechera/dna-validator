import express, { Application } from "express";
import cors from "cors";
import initializeDnaRoutes from "./routes/dna.routes";
import initializeReportRoutes from "./routes/report.routes";
import { IDnaController } from "../controllers/DnaController";
import { IReportController } from "../controllers/ReportController";
import errorHandler from "./middlewares/errorHandler";
import { Request, Response, NextFunction } from "express";
class Server {
  private app: Application;
  private port: string;
  private dnaController: IDnaController;
  private reportController: IReportController;
  //Direccion de las rutas
  private apiPaths = {
    validate: "/validate-anomaly",
    stats: "/stats",
  };
  constructor(
    dnaController: IDnaController,
    reportController: IReportController
  ) {
    this.app = express();
    this.port = process.env.PORT || "8000";
    this.dnaController = dnaController;
    this.reportController = reportController;

    this.middlewares();

    this.routes();
  }

  middlewares() {
    this.app.use(cors());

    this.app.use(express.json());

    this.app.use(express.static("public"));

    this.app.use(errorHandler);
  }

  routes() {
    const dnaRouter = initializeDnaRoutes(
      this.dnaController,
      this.reportController
    );
    this.app.use(this.apiPaths.validate, dnaRouter);
    this.app.use(
      this.apiPaths.stats,
      initializeReportRoutes(this.reportController)
    );
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Corriendo en: http://localhost:${this.port}`);
    });
  }
}

export default Server;
