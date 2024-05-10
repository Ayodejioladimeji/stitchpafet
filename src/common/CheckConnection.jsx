import React from "react";
import { Detector } from "react-detect-offline";
import CheckOnline from "./checkonline/CheckOnline";

const CheckConnection = (props) => {
  return (
    <>
      <Detector
        render={({ online }) => (online ? props.children : <CheckOnline />)}
      />
    </>
  );
};

export default CheckConnection;
