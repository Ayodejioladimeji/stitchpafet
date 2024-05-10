import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactCodeInput from 'react-verification-code-input';

// COMPONENTS
import AlertModal from '../../../common/alertmodal/AlertModal';
import {
  newPasswordModal,
  otpCodeModal,
} from '../../../redux/actions/authAction';
import { FaTimes } from 'react-icons/fa';

const OTPCode = ({ fields = 6, fieldHeight = 44, fieldWidth = 38 }) => {
  const { otpcode_modal } = useSelector((state) => state.auth);
  const [verificationCode, setVerificationCode] = useState('');
  const dispatch = useDispatch();
  const input = useRef();

  // onchange function
  const handleChange = (val) => {
    setVerificationCode(val);
  };

  // oncomplete function
  const handleComplete = () => {
    setVerificationCode((prev) => prev.toUpperCase());
  };

  // submit verification code
  const submitVerificationcode = (e) => {
    e.preventDefault();

    let isComplete = verificationCode.length === fields;

    if (isComplete) {
      console.log('complete');
      dispatch(otpCodeModal(false));
      return dispatch(newPasswordModal(true));
    } else {
      console.log('not complete');
    }
  };

  return (
    <>
      {otpcode_modal && (
        <AlertModal>
          <div className='otp-code'>
            <h3>ENTER THE 6 DIGIT OTP SENT TO YOU</h3>

            <ReactCodeInput
              type='text'
              fieldHeight={fieldHeight}
              fieldWidth={fieldWidth}
              ref={input}
              onChange={handleChange}
              onComplete={handleComplete}
              className='code-input'
            />

            <button
              className={
                verificationCode.length !== fields ? 'button-code-error' : ''
              }
              onClick={submitVerificationcode}
              disabled={verificationCode.length !== fields && true}
            >
              Continue to reset
            </button>
            <small>Wrong code, enter correct OTP Code</small>
          </div>
          <div className='cancel' onClick={() => dispatch(otpCodeModal(false))}>
            <FaTimes />
          </div>
        </AlertModal>
      )}
    </>
  );
};

export default OTPCode;
