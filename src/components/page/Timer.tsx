import React, { useState, useEffect } from "react";
import { useKey } from "react-use";
import axios from "axios";

const Timer = () => {
  const [start, setStart] = useState<number>(0);
  const [stop, setStop] = useState<number>(0);
  const [startCalc, setStartCalc] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const [activeState, setActiveState] = useState<number>(0);
  const increment = () => setActiveState((activeState) => activeState + 1);

  useEffect(() => {
    if (activeState === 1) {
      StartTimer();
    } else if (activeState === 2) {
      StopTimer();
    } else if (activeState === 3) {
      setActiveState(0);
    }
  }, [activeState]);

  useKey(" ", increment, { event: "keyup" });
  console.log(time);

  const StartTimer = () => {
    const startTime = performance.now();
    setStart(startTime);
  };
  const StopTimer = () => {
    const stopTime = performance.now();
    setStop(stopTime);
    setStartCalc(true);
  };

  useEffect(() => {
    if (startCalc === true) {
      const calc: number = (stop - start) / 1000;
      const format_calc: number = Number(calc.toFixed(3));
      setTime(format_calc);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startCalc]);
  return (
    <>
      <button onClick={StartTimer}>start</button>
      <button onClick={StopTimer}>stop</button>
    </>
  );
};

export default Timer;
