import React from "react";
import Heading from "./../heading/Heading";
import { FaCheck } from "react-icons/fa";

const Transaction = () => {
  return (
    <div className="transaction">
      <div className="transaction-top">
        <Heading
          heading="Join the Movement for Sustainable Fashion"
          text="Secure and fraud-free transactions | Fast and stress-free payment system | 2-factor authentication protection | Sellers Visibility"
        />
      </div>

      <div className="transaction-bottom">
        <div className="transaction-bottom-left">
          <div
            className="transaction-box"
            data-aos="fade-right"
            data-aos-once="true"
          >
            <h5>ESCROW PAYMENT SYSTEM</h5>
            <h1>Make Transactions Securely with our Escrow Payment Sysytem</h1>
            <ul>
              <li>
                {" "}
                <FaCheck className="transaction-check-circle" /> No more what I
                ordered vs what I got
              </li>

              <li>
                <FaCheck className="transaction-check-circle" /> No more fake
                transactions from customers
              </li>

              <li>
                {" "}
                <FaCheck className="transaction-check-circle" />
                No more payment on delivery issues
              </li>
            </ul>
            <button>Get Started</button>
          </div>
        </div>

        <div className="transaction-bottom-right">
          <div className="image-box">
            <img
              src="/images/seven.jpeg"
              alt="transaction-one"
              data-aos="fade-down"
              data-aos-once="true"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
