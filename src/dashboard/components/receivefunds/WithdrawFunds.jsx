import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addComma, strictRemoveComma } from "comma-separator";
import WithdrawModal from "../../common/modal/WithdrawModal";
import avatar from "..//images/avatar.jpg";
//
import { getBanks } from "../../../redux/actions/walletAction";
import Loading from "../../../common/alert/Loading";
import { withdrawMoney } from "./../../../redux/actions/walletAction";

const initialState = {
  amount: "",
  currency: "",
  narration: "",
  err: "",
};

const WithdrawFunds = ({ withdrawData }) => {
  const { user, token } = useSelector((state) => state.auth);
  const { walletBalance, walletCallback } = useSelector(
    (state) => state.wallet
  );
  const dispatch = useDispatch();

  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);

  // destructure the values from the firstState
  const { amount, currency, narration, err } = values;

  // getting the list of all banks and bank codes
  useEffect(() => {
    dispatch(getBanks(token.token));
  }, [dispatch, token.token]);

  // handleFirstStateChange method
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value, err: "" });
  };

  // handleWithdraw function
  const handleWithdrawal = () => {
    if (!values.amount) {
      return setValues({ ...values, err: "Amount input cannot be empty" });
    }
    if (!values.currency) {
      return setValues({ ...values, err: "Currency input cannot be empty" });
    }

    if (!values.narration) {
      return setValues({ ...values, err: "Narration input cannot be empty" });
    }

    var seconds = new Date().getTime().toString();

    const newData = {
      account_bank: withdrawData.bankcode,
      account_number: withdrawData.accountnumber,
      amount: strictRemoveComma(values.amount),
      narration: values.narration,
      currency: values.currency,
      reference: `verifibiz-transaction-${seconds}`,
      callback_url: "http://localhost:3000/dashboard/transactions",
      debit_currency: values.currency,
      add_to_beneficiary: true,
    };

    dispatch(withdrawMoney(newData, token.token, setLoading, walletCallback));
  };

  return (
    <WithdrawModal>
      <div className="receive-funds">
        <div className="receive-funds-top">
          <img src={user.profile_pic ? user.profile_pic : avatar} alt="" />
          <small>
            Balance <b>${addComma(walletBalance)}</b>
          </small>
        </div>

        <hr />

        <div className="form-group">
          <label>Amount</label>
          <input
            type="text"
            placeholder="Enter amount"
            value={amount}
            name="amount"
            onChange={(e) =>
              setValues({ ...values, amount: addComma(e.target.value) })
            }
          />
        </div>

        <div className="form-group">
          <label>Choose Currency</label>
          <select value={currency} name="currency" onChange={handleChange}>
            <option defaultValue>Choose debit currency</option>
            <option>NGN</option>
          </select>
        </div>

        <div className="form-group">
          <label>Narration</label>
          <input
            type="text"
            placeholder="Enter narration"
            value={narration}
            name="narration"
            onChange={handleChange}
          />
        </div>

        {err && <span className="err">{err}</span>}

        <button onClick={handleWithdrawal}>
          {loading ? (
            <Loading width="20px" height="20px" color="#fff" />
          ) : (
            "Withdraw"
          )}
        </button>
      </div>
    </WithdrawModal>
  );
};

export default WithdrawFunds;
