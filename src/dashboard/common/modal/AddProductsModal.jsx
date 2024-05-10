import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { GLOBALTYPES } from "../../../redux/actions/globalTypes";
import { FaTimes } from "react-icons/fa";

// PACKAGES

// COMPONENTS

const AddProductsModal = ({ children }) => {
  const dispatch = useDispatch();
  const { isEdit } = useSelector((state) => state.dashboard);

  const cancel = () => {
    dispatch({
      type: GLOBALTYPES.ADD_PRODUCT_MODAL,
      payload: false,
    });

    if (isEdit) {
      return dispatch({
        type: GLOBALTYPES.IS_EDIT,
        payload: false,
      });
    }
  };
  return (
    <div className="wallet-modalBackground">
      <div className="wallet-modalContainer">
        {children}

        <div onClick={cancel} className="wallet-modal-cancel">
          <FaTimes />
        </div>
      </div>
    </div>
  );
};

export default AddProductsModal;
