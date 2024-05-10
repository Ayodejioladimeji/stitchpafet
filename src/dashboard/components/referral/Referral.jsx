import React, { useState } from "react";
import { FaCheckDouble } from "react-icons/fa";

const Referral = () => {
  const [referrals, setReferrals] = useState(false);

  return (
    <div className="referral">
      <h3>Referrals</h3>
      <hr />
      <div className="referral-div">
        <p>Referrals Link</p>
        <div className="referral-box">
          <div className="ref">
            {referrals
              ? " https://verifibiz.africa?referral_code=kdsjfkl42kjdasf324ksdf"
              : "Generate referrals"}
          </div>
          <button onClick={() => setReferrals(true)}>
            {referrals ? "Copy link" : "Generate link"}
          </button>
        </div>

        <div className="referral-code">
          <small>Your referrals</small>
          <h2 className="your-referrals">0</h2>
        </div>

        <span>
          <FaCheckDouble className="checkdouble" />
          Refer 20 up to friends to get ₦2000 top-up in your wallet
        </span>
      </div>
    </div>
  );
};

export default Referral;
