import React from "react";
import { FiWifiOff } from "react-icons/fi";

const CheckOnline = () => {
  return (
    <div className="online-check">
      <div className="online-nav">
        <img src="/assets/new-logo-lights.png" alt="" />
      </div>

      <div className="check-online">
        <div className="online">
          <FiWifiOff className="wifi" />
          <h2>No Connection</h2>
          <p>Please check your internet connection</p>
        </div>
      </div>
    </div>
  );
};

export default CheckOnline;
