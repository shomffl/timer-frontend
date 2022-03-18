import React from "react";
import axios from "axios";

const Timer = () => {
  const onClickGet = () => {
    // axios.get("http://127.0.0.1:8000").then((res) => console.log(res.data));
    const startTime = performance.now();
    console.log(startTime);
  };
  return (
    <>
      <button onClick={onClickGet}>click</button>
    </>
  );
};

export default Timer;
