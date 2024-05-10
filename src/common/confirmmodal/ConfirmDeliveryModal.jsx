import React from "react";
import { useSelector, useDispatch } from "react-redux";
import ConfirmModals from "../../dashboard/common/modal/ConfirmModal";
//
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import Loading from "../alert/Loading";

const ConfirmDeliveryModal = ({ handleSubmit }) => {
  const { confirm_delivery_modal } = useSelector((state) => state.dashboard);
  const { alert } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <>
      {confirm_delivery_modal && (
        <ConfirmModals>
          <div className="confirm-modals">
            <h2>Confirm Delivery?</h2>
            <h3>Are you sure you received what you ordered?</h3>

            <div className="confirm-buttons">
              <button
                onClick={() =>
                  dispatch({
                    type: GLOBALTYPES.CONFIRM_DELIVERY_MODAL,
                    payload: false,
                  })
                }
                className="no"
              >
                NO
              </button>
              <button onClick={handleSubmit} className="yes">
                {alert.loading ? (
                  <Loading width="20px" height="20px" color="#fff" />
                ) : (
                  "YES"
                )}
              </button>
            </div>
          </div>
        </ConfirmModals>
      )}
    </>
  );
};

export default ConfirmDeliveryModal;
