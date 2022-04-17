import "./App.css";
import "./index.css";
import { createContext, useState } from "react";
import Header from "./components/Header";
import Timer from "./components/Timer";
import Grid from "./components/Grid";
import Controls from "./components/Controls";
import { generateSudoku, SudokuCellValue } from "./services/sudokuService";
import Curtain from "./components/Curtain";

interface TimerStartStateObj {
  value: number;
  toggle: number;
}

export const selectedSquareContext = createContext<
  [string, React.Dispatch<React.SetStateAction<string>>]
>(["", () => {}]);
export const gameContext = createContext<
  [SudokuCellValue[], React.Dispatch<React.SetStateAction<SudokuCellValue[]>>]
>([[{ value: null, notes: [], predefined: false }], () => {}]);

export const curtainDisplayContext = createContext<
  [string, React.Dispatch<React.SetStateAction<string>>]
>(["", () => {}]);

export const timerStartContext = createContext<
  [TimerStartStateObj, React.Dispatch<React.SetStateAction<TimerStartStateObj>>]
>([{ value: 0, toggle: 0 }, () => {}]);

function App() {
  const [gameState, setGameState] = useState<SudokuCellValue[]>(generateSudoku);
  const [selectedSquare, setSelectedSquare] = useState<string>("4_4_zone5_40");
  const [curtainState, setCurtainState] = useState("");
  const [timerStartState, setTimerStartState] = useState<TimerStartStateObj>({
    value: 0,
    toggle: 0,
  });
  // console.log(selectedSquare);

  return (
    <div className="App">
      <Header />
      <div className="container">
        <div className="container_gameBlock">
          <curtainDisplayContext.Provider
            value={[curtainState, setCurtainState]}
          >
            <timerStartContext.Provider
              value={[timerStartState, setTimerStartState]}
            >
              <Timer />
              <div className="gameZone">
                <selectedSquareContext.Provider
                  value={[selectedSquare, setSelectedSquare]}
                >
                  <gameContext.Provider value={[gameState, setGameState]}>
                    <Curtain />
                    <Grid />
                    <Controls />
                  </gameContext.Provider>
                </selectedSquareContext.Provider>
              </div>
            </timerStartContext.Provider>
          </curtainDisplayContext.Provider>
        </div>
      </div>
    </div>
  );
}

export default App;
