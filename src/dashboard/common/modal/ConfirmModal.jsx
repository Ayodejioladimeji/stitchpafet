import React from "react";

// COMPONENTS

const ConfirmModal = ({ children }) => {
  return (
    <div className="wallet-modalBackground">
      <div className="wallet-modalContainers">{children}</div>
    </div>
  );
};

export default ConfirmModal;
