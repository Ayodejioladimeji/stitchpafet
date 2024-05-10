import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { strictAddComma, strictRemoveComma } from "comma-separator";

//
import TopupModal from "./../../common/modal/TopupModal";
import { fundWallet } from "../../../redux/actions/walletAction";
import Loading from "./../../../common/Loading";
import avatar from "..//images/avatar.jpg";

const TopupWallet = () => {
  const [values, setValues] = useState("");
  const { token, user } = useSelector((state) => state.auth);
  const { walletBalance } = useSelector((state) => state.wallet);
  const dispatch = useDispatch();
  const [inputError, setInputError] = useState("");
  const [loading, setLoading] = useState(false);

  // handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!values) {
      setInputError("Input cannot be empty");
      return;
    }
    //
    else if (values < 500) {
      setInputError("Amount should be 500 and above");
      return;
    }
    //
    else {
      setLoading(true);
      // generating the transaction referrence with date
      var seconds = new Date().getTime().toString();

      const newData = {
        amount: strictRemoveComma(values),
        tx_ref: `verifibiz-transaction-${seconds}`,
        // redirect_url: "http://localhost:3000/transaction/processing",
        redirect_url: "https://demo.verifibiz.africa/transaction/processing",
      };

      dispatch(fundWallet(newData, token.token, setLoading));
    }
  };

  return (
    <TopupModal>
      <div className="topup-wallet">
        <div className="topup-wallet-top">
          <img src={user.profile_pic ? user.profile_pic : avatar} alt="" />
          <small>
            Balance <b>${strictAddComma(walletBalance)}</b>
          </small>
        </div>

        <hr />

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Amount</label>
            <input
              type="text"
              placeholder="Enter amount"
              onChange={(e) => setValues(strictAddComma(e.target.value))}
              value={values}
            />
            <span>{inputError}</span>
          </div>

          <button type="submit">
            {loading ? (
              <Loading width="20px" height="20px" color="#fff" />
            ) : (
              "Top-up Wallet"
            )}
          </button>
        </form>
      </div>
    </TopupModal>
  );
};

export default TopupWallet;
