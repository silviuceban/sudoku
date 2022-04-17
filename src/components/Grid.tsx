import { useContext } from "react";
import "../index.css";
import { getIdForIndex } from "../services/gridService";
import { SudokuCellValue } from "../services/sudokuService";
import { gameContext } from "../App";
import NumberCell from "./NumberCell";
import NoteCell from "./NoteCell";

function Grid() {
  const [gameState] = useContext(gameContext);

  // let address: string;
  let id: string;
  // console.log(gameState);

  const gridCells = gameState.map((element: SudokuCellValue, index: number) => {
    // address = `${Math.floor(index / 9)}_${index - Math.floor(index / 9) * 9}`;
    id = getIdForIndex(index);
    if (element.notes.length === 0) {
      return (
        <NumberCell
          key={id}
          id={id}
          value={element.value}
          predefined={element.predefined}
        />
      );
    } else {
      return <NoteCell key={id} id={id} notes={element.notes} />;
    }
  });

  return <div className="grid">{gridCells}</div>;
}

export default Grid;
