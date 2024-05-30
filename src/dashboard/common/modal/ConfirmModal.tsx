import React from "react";

// COMPONENTS

interface Props {
  children: any
}

const ConfirmModal = (props: Props) => {
  return (
    <div className="wallet-modalBackground">
      <div className="wallet-modalContainers">{props.children}</div>
    </div>
  );
};

export default ConfirmModal;
