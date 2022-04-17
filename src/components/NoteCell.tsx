import { useContext } from "react";
import {
  getHighlightClassForCell,
  getBorderClassForCell,
  getDisplayClassForNoteNumber,
} from "../services/gridService";

import { selectedSquareContext } from "../App";

interface PropsFormat {
  id: string;
  notes: number[];
}

function NoteCell(props: PropsFormat) {
  const numberList = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [selectedSquare, setSelectedSquare] = useContext(selectedSquareContext);
  const handleClick = (e: any): void => {
    setSelectedSquare(e.target.id);
  };
  return (
    <div
      className={`noteCell ${getBorderClassForCell(
        props.id
      )} ${getHighlightClassForCell(selectedSquare, props.id)}`.trim()}
      id={`${props.id}_notes`}
      onClick={handleClick}
    >
      {numberList.map((el) => {
        return (
          <div
            className={`noteNumber ${getDisplayClassForNoteNumber(
              props.notes,
              el
            )}`}
            key={`${props.id}_notes_${el}`}
          >
            {el}
          </div>
        );
      })}
    </div>
  );
}

export default NoteCell;
