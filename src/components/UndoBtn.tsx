import { useContext } from "react";
import "../index.css";
import { selectedSquareContext } from "../App";
import { gameContext } from "../App";
import { ledgerContext } from "./Controls";

const undo = require("../icons/return_blue.png");

function Undo() {
  const [gameState, setGameState] = useContext(gameContext);
  const [, setSelectedSquare] = useContext(selectedSquareContext);
  const ledger = useContext(ledgerContext);

  const handleClick = () => {
    if (ledger.current.length > 0) {
      const lastElementIndex = ledger.current.length - 1;
      const { previousValue, currentAddress } =
        ledger.current[lastElementIndex];

      let newGameState = [...gameState];
      let index = currentAddress.split("_")[3];

      if (previousValue === null || typeof previousValue === "number") {
        newGameState[index] = {
          value: previousValue,
          notes: [],
          predefined: false,
        };
      } else {
        newGameState[index] = {
          value: null,
          notes: previousValue,
          predefined: false,
        };
      }

      setGameState(newGameState);
      ledger.current.pop();
      setSelectedSquare(currentAddress);
      // console.log(newGameState);
    } else {
      console.log("nothing to undo");
    }
  };

  return (
    <img
      src={undo}
      alt="undo"
      className="icon undo"
      title="Undo"
      onClick={handleClick}
    />
  );
}
export default Undo;
