import React from "react";
import Heading from "./../heading/Heading";
import { FaCheck } from "react-icons/fa";

const Transaction = () => {
  return (
    <div className="transaction">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="transaction-bottom-left">
              <div
                className="transaction-box"
                data-aos="fade-right"
                data-aos-once="true"
              >
                <h5>Featured</h5>
                <h1>Explore Our Exclusive Collections</h1>

                <p>
                  Browse our handpicked collections featuring the latest trends
                  in Nigerian fashion. From bold prints to intricate patterns,
                  our selection offers something for everyone. Choose from a
                  variety of textiles to suit your style and taste. Whether
                  you're dressing for a traditional event or creating everyday
                  wear, we've got you covered.
                </p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="col transaction-bottom-right">
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
      </div>
      {/* <Heading
        heading="Join the Movement for Sustainable Fashion"
        text="Secure and fraud-free transactions | Fast and stress-free payment system | 2-factor authentication protection | Sellers Visibility"
      /> */}
    </div>
  );
};

export default Transaction;
