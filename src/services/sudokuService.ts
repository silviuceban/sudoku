import { makepuzzle } from "sudoku";

export interface SudokuCellValue {
  value: number | null;
  notes: number[];
  predefined: boolean;
}

export function generateSudoku() {
  // console.log("generare sudoku");

  const sudokuValues: (number | null)[] = makepuzzle();
  let result: SudokuCellValue[] = sudokuValues.map<SudokuCellValue>(
    (el: number | null) => {
      if (el !== null) {
        let squareValue: SudokuCellValue = {
          value: el + 1,
          notes: [],
          predefined: true,
        };
        Object.defineProperty(squareValue, "value", {
          value: el + 1,
          writable: false,
        });

        // console.log(squareValue);

        return squareValue;
      } else {
        return { value: null, notes: [], predefined: false };
      }
    }
  );
  return result;
}

//readonly  | is readonly
