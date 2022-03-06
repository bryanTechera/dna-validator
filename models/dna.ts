export interface IDnaModel {
  isAnomaly(): boolean;
}

type MatrixDimensions = {
  rows: number;
  cols: number;
};

type Matrix = string[][];

export class DnaModel implements IDnaModel {
  private matrix: Matrix;

  constructor(matrix: Matrix) {
    this.matrix = matrix;
    this.validate();
  }

  private validate() {
    this.validateRowsLength();
    this.validateMinDimensions();
    this.validateMaxDimensions();
  }

  private validateRowsLength = () => {
    const { rows } = this.getMatrixDimensions();
    for (let row = 0; row < rows; row++) {
      if (this.matrix[row].length !== this.matrix[0].length) {
        const err = new Error();
        err.name = "dnaNotValid";
        err.message = "Rows have different length";
        throw err;
      }
    }
  };
  private validateMinDimensions = () => {
    const { rows, cols } = this.getMatrixDimensions();

    if (rows < 3 || cols < 3) {
      const err = new Error();
      err.name = "dnaNotValid";
      err.message = "The matrix does not have min 3 rows and min 3 columns";
      throw err;
    }
  };

  private validateMaxDimensions = () => {
    const { rows, cols } = this.getMatrixDimensions();

    if (rows > 2000 || cols > 2000) {
      const err = new Error();
      err.name = "dnaNotValid";
      err.message =
        "The matrix does not have max 2000 rows and max 2000 columns";
      throw err;
    }
  };

  public isAnomaly(): boolean {
    return (
      this.isHorizontalAnomaly() ||
      this.isVerticalAnomaly() ||
      this.isDiagonalAnomaly() ||
      this.isAntiDiagonalAnomaly()
    );
  }

  private isHorizontalAnomaly = (): boolean => {
    const { rows, cols } = this.getMatrixDimensions();
    let result = false;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols - 2; col++) {
        const current = this.matrix[row][col];
        const next = this.matrix[row][col + 1];
        const nextNext = this.matrix[row][col + 2];

        if (current === next && current === nextNext) {
          result = true;
        }
      }
    }

    return result;
  };

  private isVerticalAnomaly = (): boolean => {
    const { rows, cols } = this.getMatrixDimensions();
    let result = false;

    for (let col = 0; col < cols; col++) {
      for (let row = 0; row < rows - 2; row++) {
        const current = this.matrix[row][col];
        const next = this.matrix[row + 1][col];
        const nextNext = this.matrix[row + 2][col];

        if (current === next && current === nextNext) {
          result = true;
        }
      }
    }

    return result;
  };

  private isDiagonalAnomaly = (): boolean => {
    const { rows, cols } = this.getMatrixDimensions();
    let result = false;

    for (let row = 0; row < rows - 2; row++) {
      for (let col = 0; col < cols - 2; col++) {
        const current = this.matrix[row][col];
        const next = this.matrix[row + 1][col + 1];
        const nextNext = this.matrix[row + 2][col + 2];

        if (current === next && current === nextNext) {
          result = true;
        }
      }
    }

    return result;
  };

  private isAntiDiagonalAnomaly = (): boolean => {
    const { rows, cols } = this.getMatrixDimensions();
    let result = false;

    for (let row = 0; row < rows - 2; row++) {
      for (let col = cols - 1; col > 1; col--) {
        const current = this.matrix[row][col];
        const next = this.matrix[row + 1][col - 1];
        const nextNext = this.matrix[row + 2][col - 2];

        if (current === next && current === nextNext) {
          result = true;
        }
      }
    }

    return result;
  };

  private getMatrixDimensions = (): MatrixDimensions => ({
    rows: this.matrix.length,
    cols: this.matrix[0].length,
  });
}
