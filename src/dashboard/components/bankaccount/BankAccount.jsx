import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

//
import { GLOBALTYPES } from "./../../../redux/actions/globalTypes";
import ReceiveFunds from "./../receivefunds/ReceiveFunds";
import { getBeneficiaries } from "./../../../redux/actions/walletAction";
import Loading from "./../../../common/alert/Loading";

//

const BankAccount = () => {
  const { token } = useSelector((state) => state.auth);
  const { alert } = useSelector((state) => state);
  const { receive_modal } = useSelector((state) => state.dashboard);
  const { beneficiaries } = useSelector((state) => state.wallet);
  const dispatch = useDispatch();

  // fetch all beneficiaries
  useEffect(() => {
    if (token.token) {
      dispatch(getBeneficiaries(token.token));
    }
  }, [dispatch, token.token]);

  //

  return (
    <div className="bank-account">
      {!beneficiaries && !alert.loading && <p>No bank account available</p>}
      <button
        onClick={() =>
          dispatch({ type: GLOBALTYPES.RECEIVE_MODAL, payload: true })
        }
      >
        Add new bank account
      </button>

      {alert.loading ? (
        <div className="beneficiary-loading">
          <Loading width="25px" height="25px" color="#fff" />
        </div>
      ) : (
        <div className="bank-center">
          {beneficiaries?.map((beneficiary, index) => {
            const { accountName, accountNumber, bankName } = beneficiary;
            return (
              <div key={index} className="bank-card">
                <h1>{accountName}</h1>
                <h2>{accountNumber}</h2>
                <h3>{bankName}</h3>
              </div>
            );
          })}
        </div>
      )}

      {receive_modal && <ReceiveFunds />}
    </div>
  );
};

export default BankAccount;
