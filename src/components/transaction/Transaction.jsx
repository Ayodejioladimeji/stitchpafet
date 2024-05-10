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
            <h5>Discover Our Exclusive Collections</h5>
            <h1>
              Explore a range of collections that reflect the creativity and
              diversity of our local designers
            </h1>

            <ul>
              <li>
                {" "}
                <b>Everyday Essentials:</b> Comfortable and stylish pieces for
                daily wear.
              </li>

              <li>
                {" "}
                <b>Formal Elegance:</b> Sophisticated outfits for special
                occasions.
              </li>

              <li>
                <b>Seasonal Trends:</b> Keep up with the latest fashion, made
                with a local twist.
              </li>
            </ul>
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
