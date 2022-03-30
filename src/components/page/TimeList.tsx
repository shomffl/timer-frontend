import React from "react";
import styled from "styled-components";

type TimeListProps = {
  sendTimes: number[];
};

const TimeList: React.FC<TimeListProps> = (props) => {
  const { sendTimes } = props;
  const timeList = sendTimes.map((time, key) => {
    return <li key={key}>{time}</li>;
  });
  return <SFont>{timeList}</SFont>;
};

export default TimeList;

const SFont = styled.ul`
  font-size: 3vw;
  padding: 0vw;
`;
