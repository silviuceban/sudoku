import { useContext } from "react";
import {
  getHighlightClassForCell,
  getBorderClassForCell,
  getHighlightClassForPredefinedCell,
  checkForDuplicateOfSelectedCell,
  checkForWrongValues,
} from "../services/gridService";

import { selectedSquareContext } from "../App";
import { gameContext } from "../App";
// import { gameContext } from "../App";

interface PropsFormat {
  id: string;
  value: number | null;
  predefined: boolean;
}

function NumberCell(props: PropsFormat) {
  const [selectedSquare, setSelectedSquare] = useContext(selectedSquareContext);
  const [gameState] = useContext(gameContext);
  const handleClick = (e: any): void => {
    setSelectedSquare(e.target.id);
  };
  // console.log(props.id);

  // ${checkForDuplicateValues(gameState, selectedSquare, props.id)}
  return (
    <div
      className={`numberCell ${getHighlightClassForPredefinedCell(
        props.predefined
      )} ${getBorderClassForCell(props.id)} 
      ${getHighlightClassForCell(
        selectedSquare,
        props.id
      )} ${checkForDuplicateOfSelectedCell(
        gameState,
        selectedSquare,
        props.id
      )} ${checkForWrongValues(gameState, props.id, selectedSquare)}`
        .replace(/\s+/g, " ")
        .trim()}
      id={props.id}
      onClick={handleClick}
      // style={}
    >
      {props.value || ""}
    </div>
  );
}

export default NumberCell;
