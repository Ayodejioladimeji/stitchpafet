import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import ReactCodeInput from "react-verification-code-input";

// COMPONENTS
import Loading from "../../../common/Loading";

//
import { confirmCode, resendCode } from "../../../redux/actions/authAction";
import SEO from "./../../../common/SEO";

const email = sessionStorage.getItem("email");

const ConfirmCode = ({ fields = 4, fieldHeight = 40, fieldWidth = 36 }) => {
  const { alert } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [verificationCode, setVerificationCode] = useState("");
  const input = useRef();
  const Ref = useRef(null);
  const [timer, setTimer] = useState("00:00");
  const history = useHistory();

  // console.log(email);

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    return {
      total,
      minutes,
      seconds,
    };
  };

  const startTimer = (e) => {
    let { total, minutes, seconds } = getTimeRemaining(e);

    if (total >= 0) {
      setTimer(
        (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
    }
  };

  const clearTimer = (e) => {
    setTimer("02:00");

    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 120);
    return deadline;
  };

  useEffect(() => {
    if (!email) {
      history.push("/auth/login");
    }
  }, [history]);

  // onchange function
  const handleChange = (val) => {
    setVerificationCode(val);
  };

  // oncomplete function
  const handleComplete = () => {
    setVerificationCode((prev) => prev.toUpperCase());
  };

  // Resend code to the user
  const handleResend = (e) => {
    clearTimer(getDeadTime());
    const newData = {
      email,
    };
    e.preventDefault();
    dispatch(resendCode(newData));
  };

  // submit verification code
  const submitCode = (e) => {
    e.preventDefault();

    let isComplete = verificationCode.length === fields;

    const newData = {
      email,
      code: verificationCode,
    };

    if (isComplete) {
      dispatch(confirmCode(newData));
    } else {
      console.log("not complete");
    }
  };

  return (
    <div className="confirm-code">
      <SEO title="Confirm Code" />
      <div className="confirm-code-left">
        <div className="confirm-code-top">
          <img src="/assets/new-logo-lights.png" alt="" />

          <h2>Sell from any place and at any time </h2>
          <Link to="/">
            <button>Go Home</button>
          </Link>
        </div>
        {/* <LazyLoadImage alt='' src='/assets/confirm-code.jpg' /> */}
      </div>

      <div id="overflow" className="confirm-code-right">
        <div className="confirm-code-form">
          <h1>Verify Your Account!</h1>
          <small>Enter the 4 digit verification code sent to your email!</small>

          <div className="confirm-code-box">
            <form onSubmit={submitCode}>
              <ReactCodeInput
                type="number"
                fieldHeight={fieldHeight}
                fieldWidth={fieldWidth}
                ref={input}
                fields={4}
                onChange={handleChange}
                onComplete={handleComplete}
                className={
                  alert.error ? "code-input codes-input" : "code-input"
                }
              />

              {timer !== "00:00" ? (
                <div className="resend">
                  Resend After
                  <br />
                  {timer}
                </div>
              ) : (
                <div className="resend" onClick={handleResend}>
                  Resend Code
                  <br />
                </div>
              )}

              <button
                className={
                  verificationCode.length !== fields ? "button-code-error" : ""
                }
                disabled={verificationCode.length !== fields && true}
                type="submit"
              >
                {alert.authloading === true ? (
                  <Loading width="25px" height="25px" color="#fff" />
                ) : (
                  "Verify Account"
                )}
              </button>
              <small>{alert.error}</small>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmCode;
