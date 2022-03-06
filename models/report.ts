export interface IReportModel {
  hasAnomaly: boolean;
}

export default class ReportModel implements IReportModel {
  constructor(public hasAnomaly: boolean) {}
}
