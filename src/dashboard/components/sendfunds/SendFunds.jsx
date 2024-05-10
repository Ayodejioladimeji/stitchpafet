import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CgArrowLongLeft } from "react-icons/cg";
import { useHistory } from "react-router-dom";
import { strictRemoveComma, strictAddComma, addComma } from "comma-separator";

// COMPONENTS
import AddBeneficiary from "../addbeneficiary/AddBeneficiary";
import { sendFunds } from "./../../../redux/actions/walletAction";
import Loading from "../../../common/alert/Loading";

//
const SendFunds = () => {
  const [emailphone, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [amountErr, setAmountErr] = useState("");
  const [password, setPassword] = useState("");
  const [passErr, setPassErr] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { walletBalance, walletCallback } = useSelector(
    (state) => state.wallet
  );
  const { token, user } = useSelector((state) => state.auth);
  const { add_beneficiary_modal } = useSelector((state) => state.dashboard);
  const history = useHistory();

  // handle email
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailErr("");
  };

  // handle email
  const handleAmount = (e) => {
    setAmount(strictAddComma(e.target.value));
    setAmountErr("");
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setPassErr("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!emailphone) {
      setEmailErr("Email cannot be empty");
    } else if (!amount) {
      setAmountErr("Amount cannot be empty");
    } else if (!password) {
      setPassErr("Password cannot be empty");
    } else if (strictRemoveComma(amount) < 500) {
      setAmountErr("Amount should be more than 500");
    } else {
      const newData = {
        emailphone,
        amount: strictRemoveComma(amount),
        password,
      };

      dispatch(
        sendFunds(
          newData,
          token.token,
          setLoading,
          walletCallback,
          setEmail,
          setAmount,
          setPassword
        )
      );
    }
  };

  //
  return (
    <div className="sendfunds">
      <div className="sendfunds-left">
        <div className="sendfunds-left-img">
          <img
            src="https://res.cloudinary.com/devsource/image/upload/v1657488373/verifibiz/transaction-image_besavb.jpg"
            alt=""
          />
        </div>

        <div className="sendfunds-center">
          <div className="sendfunds-name">
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
            <div className="sendfunds-balance">
              Balance : ${addComma(walletBalance)}
            </div>
          </div>

          <CgArrowLongLeft
            onClick={() => history.goBack()}
            className="arrow-left"
          />

          <p>SEND MONEY TO RECIPIENTS</p>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="text"
              name="email"
              value={emailphone}
              placeholder="Enter email address"
              onChange={handleEmail}
            />
            <small className="sendfunds-error">{emailErr}</small>
          </div>
          <div className="form-group">
            <label>Amount</label>
            <input
              type="text"
              name="amount"
              value={amount}
              placeholder="Enter amount"
              onChange={handleAmount}
            />
            <small className="sendfunds-error">{amountErr}</small>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={password}
              placeholder="******"
              onChange={handlePassword}
            />
            <small className="sendfunds-error">{passErr}</small>
          </div>

          <button onClick={handleSubmit}>
            {loading ? (
              <Loading width="15px" height="15px" color="#fff" />
            ) : (
              "Send Money"
            )}
          </button>
        </div>
      </div>
      {add_beneficiary_modal && <AddBeneficiary />}
    </div>
  );
};

export default SendFunds;
