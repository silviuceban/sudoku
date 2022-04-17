import { SudokuCellValue } from "./sudokuService";

export function getIdForIndex(index: number): string {
  let address = `${Math.floor(index / 9)}_${index - Math.floor(index / 9) * 9}`;
  let parsedAddress: string[] = address.split("_");
  let row: number = +parsedAddress[0];
  let col: number = +parsedAddress[1];

  if (row < 3 && col < 3) {
    return `${address}_zone1_${index}`;
  } else if (row < 3 && col >= 3 && col < 6) {
    return `${address}_zone2_${index}`;
  } else if (row < 3 && col >= 6 && col < 9) {
    return `${address}_zone3_${index}`;
  } else if (row >= 3 && row < 6 && col < 3) {
    return `${address}_zone4_${index}`;
  } else if (row >= 3 && row < 6 && col >= 3 && col < 6) {
    return `${address}_zone5_${index}`;
  } else if (row >= 3 && row < 6 && col >= 6 && col < 9) {
    return `${address}_zone6_${index}`;
  } else if (row >= 6 && row < 9 && col < 3) {
    return `${address}_zone7_${index}`;
  } else if (row >= 6 && row < 9 && col >= 3 && col < 6) {
    return `${address}_zone8_${index}`;
  } else if (row >= 6 && row < 9 && col >= 6 && col < 9) {
    return `${address}_zone9_${index}`;
  }
  return "";
}

export function getBorderClassForCell(selectedSquareID: string) {
  let [row, col] = selectedSquareID.split("_");
  if (
    (col === "2" && row !== "2" && row !== "5" && row !== "8") ||
    (col === "5" && row !== "2" && row !== "5" && row !== "8") ||
    (row === "8" && col === "2") ||
    (row === "8" && col === "5")
  ) {
    return "border_right";
  } else if (
    (row === "2" && col !== "2" && col !== "5" && col !== "8") ||
    (row === "5" && col !== "2" && col !== "5" && col !== "8") ||
    (row === "2" && col === "8") ||
    (row === "5" && col === "8")
  ) {
    return "border_bottom";
  } else if (
    (row === "2" && col === "2") ||
    (row === "2" && col === "5") ||
    (row === "5" && col === "2") ||
    (row === "5" && col === "5")
  ) {
    return "border_bottom border_right";
  } else {
    return "";
  }
}

export function getHighlightClassForCell(
  selectedSquareID: string,
  toBeCheckedSquareID: string
): string {
  let [s_row, s_col, s_zone] = selectedSquareID.split("_");
  let [c_row, c_col, c_zone] = toBeCheckedSquareID.split("_");

  if (
    selectedSquareID.split("_").slice(0, 4).join("_") ===
    toBeCheckedSquareID.split("_").slice(0, 4).join("_")
  ) {
    return "selectedCell";
  }

  if (selectedSquareID !== toBeCheckedSquareID && s_row === c_row) {
    return "highlightedCell";
  }
  if (selectedSquareID !== toBeCheckedSquareID && s_col === c_col) {
    return "highlightedCell";
  }
  if (s_zone === c_zone && selectedSquareID !== toBeCheckedSquareID) {
    return "highlightedCell";
  }
  return "";
}

export function getHighlightClassForPredefinedCell(predefined: boolean) {
  if (predefined) {
    return "predefined";
  } else {
    return "";
  }
}

export function getDisplayClassForNoteNumber(
  existingValues: number[],
  currentValue: number
) {
  if (existingValues.includes(currentValue)) {
    return "greyNumber";
  }
  return "";
}

export function checkForDuplicateOfSelectedCell(
  gameState: SudokuCellValue[],
  selectedSquareID: string,
  currentlyCheckedId: string
) {
  let currentlyCheckedIdSplited: string[] = currentlyCheckedId.split("_");
  let currentlyCheckedIdIndex: string = currentlyCheckedIdSplited[3];
  let selectedSquareIdSplited = selectedSquareID.split("_");
  let selectedSquareIdIndex: string = selectedSquareIdSplited[3];

  if (
    gameState[+currentlyCheckedIdIndex].value ===
      gameState[+selectedSquareIdIndex].value &&
    gameState[+selectedSquareIdIndex].value
  ) {
    if (+currentlyCheckedIdIndex === +selectedSquareIdIndex) {
      return "appropriateDuplicateCellSelectedCell";
    } else {
      return "appropriateDuplicateCell";
    }
  } else {
    return "";
  }
}

export function checkForWrongValues(
  gameState: SudokuCellValue[],
  currentlyCheckedId: string,
  selectedSquareId: string
) {
  let currentlyCheckedIdSplit = currentlyCheckedId.split("_");
  let ccId_row: string = currentlyCheckedIdSplit[0];
  let ccId_col: string = currentlyCheckedIdSplit[1];
  let ccId_zone: string = currentlyCheckedIdSplit[2];
  let ccId_index: string = currentlyCheckedIdSplit[3];
  let selectedSquareIdIndex: string = selectedSquareId.split("_")[3];

  for (let i = 0; i < gameState.length; i++) {
    let address: string = getIdForIndex(i);
    let addressSplit: string[] = address.split("_");
    let row: string = addressSplit[0];
    let col: string = addressSplit[1];
    let zone: string = addressSplit[2];
    if (
      gameState[+ccId_index].value &&
      gameState[+ccId_index].value === gameState[i].value
    ) {
      if (+ccId_index !== i) {
        if (ccId_row === row || ccId_col === col || ccId_zone === zone) {
          if (+ccId_index === +selectedSquareIdIndex) {
            return "wrongValueSelectedCell";
          } else {
            return "duplicateCell";
          }
        }
      }
    }
  }
  return "";
}
