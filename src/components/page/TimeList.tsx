import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

type TimeListProps = {
  sendTimes: number[];
  setSendTimes: Dispatch<SetStateAction<number[]>>;
};

const TimeList: React.FC<TimeListProps> = (props) => {
  const onClickDeleteTime = (key: any) => {
    const time_before_change = [...props.sendTimes];
    console.log("time_before_change", time_before_change);
    time_before_change.splice(key, 1);

    const time_after_change = [...time_before_change];
    props.setSendTimes(time_after_change);
  };
  const timeList = props.sendTimes.map((time, key) => {
    return (
      <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
        <li key={key}>{time}</li>
        <button onClick={(e) => onClickDeleteTime(key)}>delete</button>
      </div>
    );
  });
  return <SFont>{timeList}</SFont>;
};

export default TimeList;

const SFont = styled.ul`
  font-size: 3vw;
  padding: 0vw;
`;
