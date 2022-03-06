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

  public isAnomaly(): boolean {
    return (
      this.isHorizontalAnomaly() ||
      this.isVerticalAnomaly() ||
      this.isDiagonalAnomaly() ||
      this.isAntiDiagonalAnomaly()
    );
  }

  private validateSquare = (matrix: Matrix) => {
    const { rows, cols } = this.getMatrixDimensions(matrix);
    const err = new Error();
    err.name = "dnaNotValid";
    err.message = "The matrix is not square";
    if (rows !== cols) {
      throw err;
    }
  };
  private validateMinDimensions = (matrix: Matrix) => {
    const { rows, cols } = this.getMatrixDimensions(matrix);
    const err = new Error();
    err.name = "dnaNotValid";
    err.message = "The matrix does not have min 3 rows and min 3 columns";
    if (rows < 3 || cols < 3) {
      throw err;
    }
  };

  private validateMaxDimensions = (matrix: Matrix) => {
    const { rows, cols } = this.getMatrixDimensions(matrix);
    const err = new Error();
    err.name = "dnaNotValid";
    err.message = "The matrix does not have max 2000 rows and max 2000 columns";
    if (rows > 2000 || cols > 2000) {
      throw err;
    }
  };

  private validate() {
    this.validateSquare(this.matrix);
    this.validateMinDimensions(this.matrix);
    this.validateMaxDimensions(this.matrix);
  }

  private isHorizontalAnomaly = (): boolean => {
    const { rows, cols } = this.getMatrixDimensions(this.matrix);
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
    const { rows, cols } = this.getMatrixDimensions(this.matrix);
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
    const { rows, cols } = this.getMatrixDimensions(this.matrix);
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
    const { rows, cols } = this.getMatrixDimensions(this.matrix);
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

  private getMatrixDimensions = (matrix: Matrix): MatrixDimensions => ({
    rows: matrix.length,
    cols: matrix[0].length,
  });
}
