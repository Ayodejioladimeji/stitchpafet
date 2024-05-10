import React from "react";

const BestSecurity = () => {
  return (
    <div className="best-security">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="best-security-left">
              <div
                className="security-box"
                data-aos="fade-right"
                data-aos-once="true"
              >
                <h5>Trending Now</h5>
                <h1>Stay in Style with Our Latest Arrivals</h1>
                <p>
                  Keep up with the latest trends in Nigerian fashion. Check out
                  our "Trending Now" section to see what's hot. From bold Ankara
                  prints to elegant Aso-oke designs, find the fabrics that are
                  making waves in the fashion world. Get inspired and start
                  creating your unique look.
                </p>

                <button>View Products</button>
              </div>
            </div>
          </div>

          <div className="col">
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
        </div>
      </div>
    </div>
  );
};

export default BestSecurity;
