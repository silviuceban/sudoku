import React, { useContext } from "react";
import "../index.css";
import { generateSudoku } from "../services/sudokuService";
import { selectedSquareContext } from "../App";
import { gameContext } from "../App";
import { timerStartContext } from "../App";
import { ledgerContext } from "./Controls";

function NewGameBtn() {
  const [, setGameState] = useContext(gameContext);
  const [, setSelectedSquare] = useContext(selectedSquareContext);
  const ledger = useContext(ledgerContext);
  const [timerStartState, setTimerStartState] = useContext(timerStartContext);
  const handleClick = () => {
    setGameState(generateSudoku());
    setSelectedSquare("4_4_zone5_40");
    ledger.current = [];
    timerStartState.toggle === 0
      ? setTimerStartState({ value: 0, toggle: 1 })
      : setTimerStartState({ value: 0, toggle: 0 });
    // console.log("timer component ", timerStartState);
  };
  return (
    <button className="new_game_btn flex1" onClick={handleClick}>
      New Game
    </button>
  );
}

export default NewGameBtn;
