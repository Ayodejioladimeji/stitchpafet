import React from "react";
import { useSelector, useDispatch } from "react-redux";
import ConfirmModals from "../../dashboard/common/modal/ConfirmModal";

//
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import Loading from "../alert/Loading";

const RejectModal = ({ handleSubmit }) => {
  const { reject_modal } = useSelector((state) => state.dashboard);
  const { alert } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <>
      {reject_modal && (
        <ConfirmModals>
          <div className="confirm-modals">
            <h2>Reject Order?</h2>
            <h3>Are you sure you want to reject this order?</h3>

            <div className="confirm-buttons">
              <button
                onClick={() =>
                  dispatch({
                    type: GLOBALTYPES.REJECT_MODAL,
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

export default RejectModal;
