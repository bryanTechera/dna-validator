import { DnaModel } from "./dna";

test("should return error if rows dont have same length", () => {
  const matrix = [
    ["A", "A", "Z"],
    ["Ñ", "K", "O"],
    ["Q", "A", "F"],
    ["X", "G", "O", "O"],
  ];

  expect(() => new DnaModel(matrix)).toThrow();
});

test("should return error if matrix have less than 3 rows or columns", () => {
  const matrix = [
    ["A", "A", "Z"],
    ["X", "P", "O"],
  ];

  expect(() => new DnaModel(matrix)).toThrow();
});

test("should return error if matrix have more than 2000 rows or columns", () => {
  const matrix = [
    ...Array(2001)
      .fill(0)
      .map(() => Array(2001).fill(0)),
  ];

  expect(() => new DnaModel(matrix)).toThrow();
});

test("no horizontally consecutive letters", () => {
  const matrix = [
    ["A", "B", "C", "D"],
    ["E", "F", "G", "H"],
    ["I", "J", "K", "L"],
    ["M", "N", "O", "P"],
  ];
  const dna = new DnaModel(matrix);
  expect(dna.isAnomaly()).toBe(false);
});

test("horizontally consecutive letters in first row", () => {
  const matrix = [
    ["A", "A", "A", "A"],
    ["A", "B", "C", "D"],
    ["I", "J", "K", "L"],
    ["M", "N", "O", "P"],
  ];
  const dna = new DnaModel(matrix);
  expect(dna.isAnomaly()).toBe(true);
});

test("horizontally consecutive letters in last row", () => {
  const matrix = [
    ["A", "B", "C", "D"],
    ["E", "F", "G", "H"],
    ["I", "J", "K", "L"],
    ["A", "A", "A", "A"],
  ];
  const dna = new DnaModel(matrix);
  expect(dna.isAnomaly()).toBe(true);
});

test("vertically no consecutive letters", () => {
  const matrix = [
    ["A", "B", "C", "D"],
    ["E", "F", "G", "H"],
    ["I", "J", "K", "L"],
    ["M", "N", "O", "P"],
  ];
  const dna = new DnaModel(matrix);
  expect(dna.isAnomaly()).toBe(false);
});

test("vertically consecutive letters in first column", () => {
  const matrix = [
    ["A", "X", "H", "G"],
    ["A", "G", "Z", "F"],
    ["A", "J", "Ñ", "S"],
    ["A", "O", "P", "Z"],
  ];
  const dna = new DnaModel(matrix);
  expect(dna.isAnomaly()).toBe(true);
});

test("vertically consecutive letters in last column", () => {
  const matrix = [
    ["A", "B", "C", "A"],
    ["E", "F", "G", "A"],
    ["I", "J", "K", "A"],
    ["M", "N", "O", "A"],
  ];
  const dna = new DnaModel(matrix);
  expect(dna.isAnomaly()).toBe(true);
});

test("diagonally no consecutive letters", () => {
  const matrix = [
    ["A", "B", "C", "D"],
    ["E", "F", "G", "H"],
    ["I", "J", "K", "L"],
    ["M", "N", "O", "P"],
  ];
  const dna = new DnaModel(matrix);
  expect(dna.isAnomaly()).toBe(false);
});

test("diagonally consecutive letters from first column to last", () => {
  const matrix = [
    ["A", "B", "C", "Z"],
    ["G", "A", "C", "K"],
    ["F", "B", "A", "H"],
    ["A", "B", "C", "A"],
  ];
  const dna = new DnaModel(matrix);
  expect(dna.isAnomaly()).toBe(true);
});

test("diagonally consecutive letters in middle", () => {
  const matrix = [
    ["A", "B", "C", "Z"],
    ["A", "Z", "C", "K"],
    ["F", "A", "A", "H"],
    ["A", "B", "A", "A"],
  ];
  const dna = new DnaModel(matrix);
  expect(dna.isAnomaly()).toBe(true);
});

test("diagonally Inverse no consecutive letters", () => {
  const matrix = [
    ["A", "B", "C", "D"],
    ["E", "F", "G", "H"],
    ["I", "J", "K", "L"],
    ["M", "N", "O", "P"],
  ];
  const dna = new DnaModel(matrix);
  expect(dna.isAnomaly()).toBe(false);
});

test("diagonally Inverse consecutive letters from last column to first", () => {
  const matrix = [
    ["A", "B", "C", "A"],
    ["G", "J", "A", "K"],
    ["F", "A", "X", "H"],
    ["A", "B", "C", "A"],
  ];
  const dna = new DnaModel(matrix);
  expect(dna.isAnomaly()).toBe(true);
});

test("diagonally Inverse consecutive letters in middle", () => {
  const matrix = [
    ["A", "B", "C", "O"],
    ["G", "J", "D", "A"],
    ["F", "W", "A", "H"],
    ["I", "A", "C", "A"],
  ];
  const dna = new DnaModel(matrix);
  expect(dna.isAnomaly()).toBe(true);
});
