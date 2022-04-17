import React, { useRef, createContext } from "react";
import NewGameBtn from "./NewGameBtn";
import "../index.css";
import Undo from "./UndoBtn";
import Eraser from "./EraserBtn";
import Notes from "./NotesBtn";
import NumPadBtn from "./NumPadBtn";

// interface LedgerEntry {
//   previousValue: null;
//   currentValue: number;
//   currentAddress: string;
// }

export const ledgerContext = createContext<any>([]);

export const notesModeContext = createContext<React.MutableRefObject<boolean>>({
  current: false,
});

export default function Controls() {
  const ledger = useRef([]);
  const isNotesModeOn = useRef(false);

  const props = [
    { num: 1, id: "num_1" },
    { num: 2, id: "num_2" },
    { num: 3, id: "num_3" },
    { num: 4, id: "num_4" },
    { num: 5, id: "num_5" },
    { num: 6, id: "num_6" },
    { num: 7, id: "num_7" },
    { num: 8, id: "num_8" },
    { num: 9, id: "num_9" },
  ];
  return (
    <div className="controls">
      <ledgerContext.Provider value={ledger}>
        <notesModeContext.Provider value={isNotesModeOn}>
          <NewGameBtn />
          <div className="buttons_pannel">
            <Undo />
            <Eraser />
            <Notes />
          </div>
          <div className="num_pad">
            <div className="flex_row">
              <NumPadBtn {...props[0]} />
              <NumPadBtn {...props[1]} />
              <NumPadBtn {...props[2]} />
            </div>
            <div className="flex_row">
              <NumPadBtn {...props[3]} />
              <NumPadBtn {...props[4]} />
              <NumPadBtn {...props[5]} />
            </div>
            <div className="flex_row">
              <NumPadBtn {...props[6]} />
              <NumPadBtn {...props[7]} />
              <NumPadBtn {...props[8]} />
            </div>
          </div>
        </notesModeContext.Provider>
      </ledgerContext.Provider>
    </div>
  );
}
