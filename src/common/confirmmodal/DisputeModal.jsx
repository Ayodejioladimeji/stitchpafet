import React from "react";
import { useSelector, useDispatch } from "react-redux";
import ConfirmModals from "../../dashboard/common/modal/ConfirmModal";

//
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import Loading from "../alert/Loading";

const DisputeModal = ({ handleSubmit }) => {
  const { dispute_modal } = useSelector((state) => state.dashboard);
  const { alert } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <>
      {dispute_modal && (
        <ConfirmModals>
          <div className="confirm-modals">
            <h2>Confirm Delivery?</h2>
            <h3>Are you sure you received what you ordered?</h3>

            <div className="confirm-buttons">
              <button
                onClick={() =>
                  dispatch({
                    type: GLOBALTYPES.DISPUTE_MODAL,
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

export default DisputeModal;
