import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addComma } from "comma-separator";
import ReceiveModal from "./../../common/modal/ReceiveModal";
import avatar from "..//images/avatar.jpg";
//
import { getBanks, resolveAccount } from "../../../redux/actions/walletAction";
import Loading from "./../../../common/alert/Loading";

const firstState = {
  accountNumber: "",
  bankCode: "",
};

// const secondState = {

// }

const ReceiveFunds = () => {
  const { user, token } = useSelector((state) => state.auth);
  const { walletBalance, banks } = useSelector((state) => state.wallet);
  const { callback } = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  // The input states
  const [values, setValues] = useState(firstState);

  // destructure the values from the firstState
  const { accountNumber, bankCode } = values;

  // getting the list of all banks and bank codes
  useEffect(() => {
    dispatch(getBanks(token.token));
  }, [dispatch, token.token]);

  // handleChange method
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  // handleCheck Account number method

  const handleCheckAccount = () => {
    const newBank = banks.filter((item) => item.code === values.bankCode);

    const newData = {
      accountNumber: values.accountNumber,
      bankCode: values.bankCode,
    };

    dispatch(
      resolveAccount(
        newData,
        token.token,
        setLoading,
        newBank[0].name,
        values.bankCode,
        callback
      )
    );
  };

  return (
    <ReceiveModal>
      <div className="receive-funds">
        <div className="receive-funds-top">
          <img src={user.profile_pic ? user.profile_pic : avatar} alt="" />
          <small>
            Balance <b>${addComma(walletBalance)}</b>
          </small>
        </div>

        <hr />

        <div className="form-group">
          <label>Account number</label>
          <input
            type="text"
            placeholder="Enter account number"
            value={accountNumber}
            name="accountNumber"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Choose Bank</label>
          <select name="bankCode" value={bankCode} onChange={handleChange}>
            <option defaultValue>Choose your bank</option>
            {banks.map((bank) => {
              return (
                <option key={bank.id} value={bank.code}>
                  {bank.name}
                </option>
              );
            })}
          </select>
        </div>

        <button onClick={handleCheckAccount}>
          {loading ? (
            <Loading width="20px" height="20px" color="#fff" />
          ) : (
            "Add Account"
          )}
        </button>
      </div>
    </ReceiveModal>
  );
};

export default ReceiveFunds;
