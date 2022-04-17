import { useContext, useState } from "react";
import "../index.css";
import { notesModeContext } from "./Controls";
const notesOFF = require("../icons/notes_off.png");
const notesON = require("../icons/notes_on.png");

function Notes() {
  const isNotesModeOn = useContext(notesModeContext);
  let [currentIcon, setCurrentIcon] = useState(notesOFF);
  const handleClick = () => {
    isNotesModeOn.current === false
      ? (isNotesModeOn.current = true)
      : (isNotesModeOn.current = false);
    currentIcon === notesOFF
      ? setCurrentIcon(notesON)
      : setCurrentIcon(notesOFF);
    console.log("NotesMode: ", isNotesModeOn.current);
  };

  return (
    <img
      src={currentIcon}
      alt="notes"
      className="icon notes"
      title="Make Notes"
      onClick={handleClick}
    />
  );
}

export default Notes;
