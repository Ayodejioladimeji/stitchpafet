import React from "react";
import { FaTimes } from "react-icons/fa";

// PACKAGES

// COMPONENTS

const CameraModal = ({ setCam, children }) => {
  return (
    <div className="camera-modalBackground">
      <div className="camera-modalContainer">
        {children}

        <div onClick={() => setCam(false)} className="camera-modal-cancel">
          <FaTimes />
        </div>
      </div>
    </div>
  );
};

export default CameraModal;
