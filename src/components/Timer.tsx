import { useContext, useState, useEffect, useRef } from "react";
import "../index.css";
import { curtainDisplayContext } from "../App";
import { timerStartContext } from "../App";
const pause = require("../icons/video-pause-button-grey.png");
const play = require("../icons/play-button-grey.png");

function Timer() {
  const [playPauseBtn, setPlayPauseBtn] = useState(pause);
  const [isPaused, setIsPaused] = useState(false);
  const [minutesState, setMinutesState] = useState<any>("00");
  const [secondsState, setSecondsState] = useState<any>("00");
  const [curtainState, setCurtainState] = useContext(curtainDisplayContext);
  const [timerStartState] = useContext(timerStartContext);

  const handleClick = () => {
    playPauseBtn === pause ? setPlayPauseBtn(play) : setPlayPauseBtn(pause);
    isPaused === false ? setIsPaused(true) : setIsPaused(false);
    curtainState === "" ? setCurtainState("displayFlex") : setCurtainState("");
  };

  let sec = useRef(timerStartState.value);
  let previousTooggleValue = useRef(0);
  // console.log(timerStartState);

  function addZero(val: number): string {
    return val > 9 ? val.toString() : "0" + val.toString();
  }
  useEffect(() => {
    const timer = setInterval(function () {
      if (!isPaused) {
        if (previousTooggleValue.current === timerStartState.toggle) {
          setSecondsState(addZero(++sec.current % 60));
          setMinutesState(addZero(parseInt((sec.current / 60).toString(), 10)));
        } else {
          sec.current = 0;
          previousTooggleValue.current = timerStartState.toggle;
          setSecondsState(addZero(++sec.current % 60));
          setMinutesState(addZero(parseInt((sec.current / 60).toString(), 10)));
        }
        // console.log(sec);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [isPaused, timerStartState.toggle]);

  return (
    <div className="timerBlock">
      <div className="timer">
        <span id="minutes">{minutesState}</span>:
        <span id="seconds">{secondsState}</span>
        <img
          src={playPauseBtn}
          alt="pause"
          className="play_pause"
          onClick={handleClick}
        />
      </div>
    </div>
  );
}

export default Timer;
