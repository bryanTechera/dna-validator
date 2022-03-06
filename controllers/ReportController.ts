import { IReportRepository } from "../repositories/IReportRepository";
import { IReportModel } from "../models/report";
import SummaryReport, { ISummaryReport } from "../models/summary";
import ReportModel from "../models/report";

export interface IReportController {
  getSummaryReport(): Promise<ISummaryReport>;
  createReportWithAnomaly(): Promise<IReportModel>;
  createReportWhitoutAnomaly(): Promise<IReportModel>;
}

export default class ReportController implements IReportController {
  constructor(private repository: IReportRepository) {}

  async getSummaryReport(): Promise<ISummaryReport> {
    const countWithAnomaly = await this.getCountWithAnomaly();
    const countWithoutAnomaly = await this.getCountWithoutAnomaly();

    const sumary = new SummaryReport(countWithAnomaly, countWithoutAnomaly);
    return sumary;
  }

  private async getCountWithAnomaly() {
    const withAnomaly = await this.repository.getReporsWithAnomaly();
    const totalWithAnomaly = withAnomaly.length;
    return totalWithAnomaly;
  }

  private async getCountWithoutAnomaly() {
    const withtoutAnomaly = await this.repository.getReportsWhitoutAnomaly();
    const totalWithoutAnomaly = withtoutAnomaly.length;
    return totalWithoutAnomaly;
  }
  async createReportWithAnomaly(): Promise<IReportModel> {
    const report = new ReportModel(true);
    const reportCreated = await this.repository.create(report);
    return reportCreated;
  }

  async createReportWhitoutAnomaly(): Promise<IReportModel> {
    const report = new ReportModel(false);
    const reportCreated = await this.repository.create(report);
    return reportCreated;
  }
}
