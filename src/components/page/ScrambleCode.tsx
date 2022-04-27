import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const ScrambleCode: React.FC<any> = React.memo((props) => {
  const { sendTimes } = props;
  const [code, setCode] = useState();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_AWS_URL}/generate-code`)
      .then((res) => setCode(res.data.code));
  }, [sendTimes]);

  return <SFont>{code}</SFont>;
});

export default ScrambleCode;

const SFont = styled.span`
  font-size: 3vw;
  padding: 1vw;
`;
