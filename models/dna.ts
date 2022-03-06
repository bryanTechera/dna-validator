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
    this.validateMatrix();
  }

  public isAnomaly(): boolean {
    return (
      this.isHorizontalAnomaly() ||
      this.isVerticalAnomaly() ||
      this.isDiagonalAnomaly() ||
      this.isAntiDiagonalAnomaly()
    );
  }

  private validateMatrix() {
    const { rows, cols } = this.getMatrixDimensions(this.matrix);
    if (rows !== cols) {
      const err = new Error();
      err.name = "dnaNotSquare";
      err.message = "This dna matris is not supported";
      throw err;
    }
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
