import React from "react";
import { useDispatch } from "react-redux";

//
import { resetpasswordModal } from "./../../../redux/actions/authAction";
import ResetPassword from "../../../components/auth/forgot/ResetPassword";
import { GLOBALTYPES } from "./../../../redux/actions/globalTypes";
import DeleteAccountModal from "../../../common/confirmmodal/DeleteAccountModal";

const Security = () => {
  const dispatch = useDispatch();

  return (
    <div className="security">
      <div className="security-password">
        <h3>Reset Password</h3>
        <p>To login your password is required</p>
        <button onClick={() => dispatch(resetpasswordModal(true))}>
          Change Password
        </button>
      </div>

      <div className="security-password">
        <h3>2Factor Authentication</h3>
        <p>
          2 Factor Authentication is a multi-layer security measure to ensure
          the safety of your account
        </p>
        <button disabled>Enable 2FA</button>
        <span>Coming soon</span>
      </div>

      <div className="security-password">
        <h3>Delete Account</h3>
        <p>Thank you for transacting with us, so sad we will miss you 😟</p>
        <button
          onClick={() =>
            dispatch({ type: GLOBALTYPES.DELETE_ACCOUNT_MODAL, payload: true })
          }
          className="delete"
        >
          Delete Account
        </button>
      </div>

      <ResetPassword />
      <DeleteAccountModal />
    </div>
  );
};

export default Security;
