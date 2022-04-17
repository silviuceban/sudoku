import { useContext } from "react";
import "../index.css";
import { gameContext } from "../App";
import { ledgerContext } from "./Controls";
import { selectedSquareContext } from "../App";

const eraser = require("../icons/eraser_blue.png");

function Eraser() {
  const [gameState, setGameState] = useContext(gameContext);
  const [selectedSquare] = useContext(selectedSquareContext);
  const ledger = useContext(ledgerContext);
  const handleClick = () => {
    // console.log(selectedSquare);
    let previousValue: number | number[] | null;
    const index = +selectedSquare.split("_")[3];
    // console.log(index);

    let newGameState = [...gameState];

    if (newGameState[index].value) {
      previousValue = newGameState[index].value;
      newGameState[index].value = null;
    } else if (newGameState[index].notes.length > 0) {
      previousValue = [...newGameState[index].notes];
      newGameState[index].notes.length = 0;
    } else {
      return;
    }
    setGameState(newGameState);
    ledger.current.push({
      previousValue,
      currentValue: null,
      currentAddress: selectedSquare,
    });
    console.log(ledger.current);
  };
  return (
    <img
      src={eraser}
      alt="erase"
      className="icon eraser"
      title="Erase"
      onClick={handleClick}
    />
  );
}

export default Eraser;
