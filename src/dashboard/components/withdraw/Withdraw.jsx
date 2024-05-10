import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CgArrowLongLeft } from "react-icons/cg";
import { useHistory } from "react-router-dom";
import { addComma } from "comma-separator";

// COMPONENTS
import ReceiveFunds from "./../receivefunds/ReceiveFunds";
import { GLOBALTYPES } from "./../../../redux/actions/globalTypes";
import WithdrawFunds from "./../receivefunds/WithdrawFunds";
import Loading from "./../../../common/alert/Loading";
import {
  deleteBeneficiary,
  getBeneficiaries,
} from "./../../../redux/actions/walletAction";

//
const Withdraw = () => {
  const dispatch = useDispatch();
  const { walletBalance, beneficiaries } = useSelector((state) => state.wallet);
  const { user, token } = useSelector((state) => state.auth);
  const { alert } = useSelector((state) => state);
  const { receive_modal, withdraw_modal, callback } = useSelector(
    (state) => state.dashboard
  );
  const history = useHistory();
  const [withdrawData, setWithdrawData] = useState({});

  // fetch all beneficiaries
  useEffect(() => {
    if (token.token) {
      dispatch(getBeneficiaries(token.token));
    }
  }, [dispatch, callback, token.token]);

  // Getting withdrawal data
  const getWithdrawData = (data) => {
    setWithdrawData(data);
    dispatch({
      type: GLOBALTYPES.WITHDRAW_MODAL,
      payload: true,
    });
  };

  // delete beneficiaries
  const remove = (id) => {
    dispatch(deleteBeneficiary(token.token, id, callback));
  };

  //
  return (
    <div className="withdraw">
      <div className="withdraw-left">
        <div className="withdraw-left-img">
          <img
            src="https://res.cloudinary.com/devsource/image/upload/v1657488373/verifibiz/transaction-image_besavb.jpg"
            alt=""
          />
        </div>

        <div className="withdraw-center">
          <div className="withdraw-name">
            <h2>
              {" "}
              Hi,{" "}
              {user.first_name ? (
                <>
                  {user.first_name} {user.last_name}
                </>
              ) : (
                "user"
              )}
            </h2>
            <div className="withdraw-balance">
              Balance : ${addComma(walletBalance)}
            </div>
          </div>

          <CgArrowLongLeft
            onClick={() => history.goBack()}
            className="arrow-left"
          />

          <div className="withdraw-div">
            <p>WITHDRAW YOUR MONEY</p>
            <button
              onClick={() =>
                dispatch({ type: GLOBALTYPES.RECEIVE_MODAL, payload: true })
              }
            >
              {" "}
              + Add Bank
            </button>
          </div>

          {alert.loading ? (
            <div className="beneficiary-loading">
              <Loading width="25px" height="25px" color="#fff" />
            </div>
          ) : (
            <div className="withdraw-beneficiaries">
              {beneficiaries?.map((beneficiary, index) => {
                const { ID, accountName, accountNumber, bankName } =
                  beneficiary;

                return (
                  <div key={index} className="withdraw-card">
                    <h1>{accountName}</h1>
                    <h2>{accountNumber}</h2>
                    <h3>{bankName}</h3>

                    <div className="withdraw-button">
                      <button onClick={() => remove(ID)}>Remove</button>
                      <button onClick={() => getWithdrawData(beneficiary)}>
                        Withdraw
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {receive_modal && <ReceiveFunds />}
      {withdraw_modal && <WithdrawFunds withdrawData={withdrawData} />}
    </div>
  );
};

export default Withdraw;
