import { useContext } from "react";
import { selectedSquareContext } from "../App";
import { gameContext } from "../App";
import { ledgerContext } from "./Controls";
import "../index.css";
import { notesModeContext } from "./Controls";
import { SudokuCellValue } from "../services/sudokuService";

interface NumPadBtnPropsInterface {
  num: number;
  id: string;
}

function updateValue(cellState: SudokuCellValue, buttonValue: number) {
  let previousValue;
  if (cellState.value === buttonValue) {
    previousValue = buttonValue;
    cellState.value = null;
  } else {
    previousValue =
      cellState.notes.length === 0 ? cellState.value : [...cellState.notes];
    cellState.value = buttonValue;
    cellState.notes = [];
  }
  return {
    previousValue,
    currentValue: cellState.value,
  };
}

function updateNotes(cellState: SudokuCellValue, buttonValue: number) {
  let previousValue;
  if (cellState.value !== null) {
    previousValue = cellState.value;
    cellState.value = null;
    cellState.notes.push(buttonValue);
  } else if (cellState.notes.length > 0) {
    previousValue = [...cellState.notes];
    if (cellState.notes.includes(buttonValue)) {
      cellState.notes = cellState.notes.filter(
        (note: number) => note !== buttonValue
      );
    } else {
      cellState.notes.push(buttonValue);
    }
  } else {
    previousValue = null;
    cellState.notes.push(buttonValue);
  }
  return {
    previousValue,
    currentValue: [...cellState.notes],
  };
}

function NumPadBtn(props: NumPadBtnPropsInterface) {
  const [gameState, setGameState] = useContext(gameContext);
  const [selectedSquare] = useContext(selectedSquareContext);
  const isNotesModeOn = useContext(notesModeContext);
  const ledger = useContext(ledgerContext);

  const handleClick = () => {
    let newGameState = [...gameState];

    let index: number = +selectedSquare.split("_")[3];

    const cellState = newGameState[index];

    let ledgerValues;
    try {
      ledgerValues = isNotesModeOn.current
        ? updateNotes(cellState, props.num)
        : updateValue(cellState, props.num);

      setGameState(newGameState);
      ledger.current.push({
        ...ledgerValues,
        currentAddress: selectedSquare,
      });
      console.log(ledger.current);
    } catch (error) {
      console.log("cannot change predefined value");
    }
  };

  return (
    <button className="num_pad_button" id={props.id} onClick={handleClick}>
      {props.num}
    </button>
  );
}

export default NumPadBtn;
