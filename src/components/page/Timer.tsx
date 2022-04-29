import React, { useState, useEffect } from "react";
import { useKey } from "react-use";
import axios from "axios";
import ScrambleCode from "./ScrambleCode";
import TimeList from "./TimeList";
import styled from "styled-components";
import CreateSheetModal from "./CreateSheetModal";

const Timer = () => {
  const [start, setStart] = useState<number>(0);
  const [stop, setStop] = useState<number>(0);
  const [startCalc, setStartCalc] = useState<boolean>(false);
  const [time, setTime] = useState<any>("0.00");
  const [activeState, setActiveState] = useState<number>(0);
  const [inspectionTime, setInspectionTime] = useState<number>(15);
  const [handleInspection, setHandleInspection] = useState<boolean>(false);
  const [sendTimes, setSendTimes] = useState<number[]>([]);
  const [averageTime, setAverageTime] = useState<number>(0);

  // キーボード操作
  const increment = () => setActiveState((activeState) => activeState + 1);
  useKey(" ", increment, { event: "keyup" });

  // 計測したタイムをバックエンドへ送信する
  const handleSendTimes = (times: number[]) => {
    setSendTimes([]);
    const data = {
      times: times,
    };
    axios
      .post(`${process.env.REACT_APP_AWS_URL}/record-times`, data)
      .then((res) => {
        console.log(res.data);
      });
  };

  // インスペクションタイムのカウントダウンを行う
  useEffect(() => {
    if (handleInspection === true) {
      const interval = setInterval(() => {
        setInspectionTime(inspectionTime - 1);
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }
  });

  // activeStateの数字に応じて挙動を変える
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

  // 計測開始
  const StartTimer = () => {
    const startTime = performance.now();
    setStart(startTime);
  };

  // 計測終了
  const StopTimer = () => {
    const stopTime = performance.now();
    setStop(stopTime);
    setStartCalc(true);
  };

  // 計測時間の形を整える
  useEffect(() => {
    if (startCalc === true) {
      const calc: number = (stop - start) / 1000;
      const format_calc: number = Number(calc.toFixed(3));
      setTime(format_calc);
      const item_list = [...sendTimes, format_calc];
      setSendTimes(item_list);
      const total = item_list.reduce((sum, element) => sum + element, 0);
      const average_calc: number = Number(
        (total / item_list.length).toFixed(3)
      );
      setAverageTime(average_calc);
      if (item_list.length === 10) {
        handleSendTimes(item_list);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startCalc]);

  return (
    <>
      <ScrambleCode sendTimes={sendTimes} />

      <div style={{ position: "absolute", top: 10, right: 20 }}>
        <CreateSheetModal />
      </div>

      <TimePosition>
        {handleInspection ? (
          <SFont>{inspectionTime}</SFont>
        ) : (
          <SFont>{time}</SFont>
        )}
      </TimePosition>

      <TimeListPosition>
        <div style={{ fontSize: "3vw" }}>AVG : {averageTime}</div>
        <TimeList sendTimes={sendTimes} setSendTimes={setSendTimes} />
      </TimeListPosition>
    </>
  );
};

export default Timer;

const SFont = styled.div`
  font-size: 20vw;
`;

const TimePosition = styled.div`
  position: absolute;
  left: 12vw;
  top: 20vh;
`;

const TimeListPosition = styled.div`
  position: absolute;
  top: 7vw;
  left: 80vw;
`;
