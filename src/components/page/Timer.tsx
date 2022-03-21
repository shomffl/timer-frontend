import React, { useState, useEffect } from "react";
import { useKey } from "react-use";
import axios from "axios";

const Timer = () => {
  const [start, setStart] = useState<number>(0);
  const [stop, setStop] = useState<number>(0);
  const [startCalc, setStartCalc] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const [activeState, setActiveState] = useState<number>(0);
  const [inspectionTime, setInspectionTime] = useState<number>(15);
  const [handleInspection, setHandleInspection] = useState<boolean>(false);
  const [sendTimes, setSendTimes] = useState<number[]>([]);

  const increment = () => setActiveState((activeState) => activeState + 1);

  const handleSendTimes = () => {
    const data = {
      times: sendTimes,
    };
    axios
      .post("http://127.0.0.1:8000/test", data)
      .then((res) => console.log(res.data));
  };

  useEffect(() => {
    if (handleInspection === true) {
      const interval = setInterval(() => {
        setInspectionTime(inspectionTime - 1);
        console.log(inspectionTime);
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }
  });

  useEffect(() => {
    if (activeState === 1) {
      setTime(0);
      setStartCalc(false);
      setHandleInspection(true);
    } else if (activeState === 2) {
      setHandleInspection(false);
      StartTimer();
    } else if (activeState === 3) {
      StopTimer();
      setActiveState(0);
    }
    return () => setInspectionTime(15);
  }, [activeState]);

  useKey(" ", increment, { event: "keyup" });

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
      setSendTimes([...sendTimes, format_calc]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startCalc]);
  return (
    <>
      <button onClick={handleSendTimes}>send</button>
      <div>{inspectionTime}</div>
      <div>{time}</div>
    </>
  );
};

export default Timer;
