import { IReportModel } from "../models/report";

export interface IReportRepository {
  getReporsWithAnomaly(): Promise<IReportModel[]>;
  getReportsWhitoutAnomaly(): Promise<IReportModel[]>;
  create(result: IReportModel): Promise<IReportModel>;
}
