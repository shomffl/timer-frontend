import React, { useState, useEffect } from "react";
import axios from "axios";

const ScrambleCode = () => {
  const [code, setCode] = useState();
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/generate-code")
      .then((res) => setCode(res.data.code));
  }, []);

  return <>{code}</>;
};

export default ScrambleCode;
