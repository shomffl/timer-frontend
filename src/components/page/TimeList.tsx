import React from "react";

type TimeListProps = {
  sendTimes: number[];
};

const TimeList: React.FC<TimeListProps> = (props) => {
  const { sendTimes } = props;
  const timeList = sendTimes.map((time) => {
    return <li>{time}</li>;
  });
  return <ul>{timeList}</ul>;
};

export default TimeList;
