import { IReportModel } from "../models/report";
import ReportModel from "../models/report";
import { IReportRepository } from "./IReportRepository";
import { Pool } from "pg";

export default class ReportRepositoryDb implements IReportRepository {
  private dbClient;
  constructor(dbClient: Pool) {
    this.dbClient = dbClient;
  }

  async getReporsWithAnomaly(): Promise<IReportModel[]> {
    //obtiene los reportes con anomaly retorna
    //{[{hasAnomaly:true}]}
    const reportsData = await this.dbClient.query(
      "select hasAnomaly from reports where hasAnomaly=true"
    );
    return reportsData.rows;
  }

  async getReportsWhitoutAnomaly(): Promise<IReportModel[]> {
    const reportsData = await this.dbClient.query(
      "select hasAnomaly from reports where hasAnomaly=false"
    );
    return reportsData.rows;
  }

  async create(report: IReportModel): Promise<IReportModel> {
    //guarda en la bd
    await this.dbClient.query("insert into report(hasanomaly) values($1)", [
      String(report.hasAnomaly),
    ]);
    return report;
  }
}
