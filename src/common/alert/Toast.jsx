import React from "react";
import { FaTimesCircle } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";

const Toast = ({ msg, title, className }) => {
  return (
    <div className={className}>
      <div className="body">
        {title === "error" ? (
          <FaTimesCircle className="times" />
        ) : (
          <FaCheckCircle className="times" />
        )}
        {msg.body}
      </div>
    </div>
  );
};
export default Toast;
