import React from "react";
import { useDispatch } from "react-redux";
import { GLOBALTYPES } from "./../../../redux/actions/globalTypes";
import { FaTimes } from "react-icons/fa";

// PACKAGES

// COMPONENTS

const WalletsModal = ({ children }) => {
  const dispatch = useDispatch();
  return (
    <div className="wallet-modalBackground">
      <div className="wallet-modalContainer">
        {children}

        <div
          onClick={() =>
            dispatch({
              type: GLOBALTYPES.ADD_BENEFICIARY_MODAL,
              payload: false,
            })
          }
          className="wallet-modal-cancel"
        >
          <FaTimes />
        </div>
      </div>
    </div>
  );
};

export default WalletsModal;
