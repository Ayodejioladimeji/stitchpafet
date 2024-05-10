import React from "react";

const BestSecurity = () => {
  return (
    <div className="best-security">
      <div className="best-security-left">
        <div
          className="security-box"
          data-aos="fade-right"
          data-aos-once="true"
        >
          <h5>FLEXIBLE MARKETPLACE</h5>
          <h1>Sell from anywhere at any time nationwide.</h1>
          <p>
            There is no limitation as to where you can sell from and who can buy
            from you. We give you the visibility you have always wanted with
            sales on zero commision
          </p>

          <button>Signup as a Vendor</button>
        </div>
      </div>

      <div className="best-security-right">
        <div className="image-box">
          <img
            src="/images/five.jpeg"
            alt="best-security"
            data-aos="fade-down"
            data-aos-once="true"
          />
        </div>
      </div>
    </div>
  );
};

export default BestSecurity;
