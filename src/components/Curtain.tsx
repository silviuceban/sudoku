import React, { useContext } from "react";
import { curtainDisplayContext } from "../App";

function Curtain() {
  const [curtainState] = useContext(curtainDisplayContext);
  return (
    <div className={`curtain ${curtainState}`.trim()}>
      <p className="curtainParagraph">{`<PAUSE/>`}</p>
    </div>
  );
}

export default Curtain;
