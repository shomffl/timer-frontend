import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Timer from "../components/page/Timer";

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Timer />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
