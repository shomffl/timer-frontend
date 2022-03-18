import React, { useState, useEffect } from "react";
import axios from "axios";

const Timer = () => {
  const [start, setStart] = useState<number>(0);
  const [stop, setStop] = useState<number>(0);
  const [startCalc, setStartCalc] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);

  const onClickStart = () => {
    // axios.get("http://127.0.0.1:8000").then((res) => console.log(res.data));
    const startTime = performance.now();
    setStart(startTime);
  };
  const onClickStop = () => {
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
  console.log(time);
  return (
    <>
      <button onClick={onClickStart}>start</button>
      <button onClick={onClickStop}>stop</button>
    </>
  );
};

export default Timer;
