export interface ISummaryReport {
  countAnomalies: number;
  countNoAnomalies: number;
  ratio: string;
}

export default class SummaryReport implements ISummaryReport {
  countAnomalies: number;
  countNoAnomalies: number;
  ratio: string;
  constructor(countAnomalies: number, countNoAnomalies: number) {
    this.countAnomalies = countAnomalies;
    this.countNoAnomalies = countNoAnomalies;
    this.ratio = this.getRatio();
  }
  private getRatio(): string {
    return (
      this.countAnomalies /
      (this.countNoAnomalies + this.countAnomalies)
    ).toFixed(2);
  }
}
