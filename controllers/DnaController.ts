import { DnaModel } from "../models/dna";

export interface IDnaController {
  isAnomaly(dna: string[][]): boolean;
}

export default class DnaController implements IDnaController {
  public isAnomaly(dna: string[][]): boolean {
    const model = new DnaModel(dna);
    return model.isAnomaly();
  }
}
