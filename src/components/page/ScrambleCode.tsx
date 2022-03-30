import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const ScrambleCode: React.FC<any> = (props) => {
  const { sendTimes } = props;
  const [code, setCode] = useState();
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/generate-code")
      .then((res) => setCode(res.data.code));
  }, [sendTimes]);

  return <SFont>{code}</SFont>;
};

export default ScrambleCode;

const SFont = styled.span`
  font-size: 3vw;
  padding: 1vw;
`;
