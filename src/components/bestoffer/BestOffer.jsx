import React from "react";

const BestOffer = () => {
  return (
    <div className="best-offer">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="best-offer-left">
              <div className="image-box">
                <img
                  src="/images/3.jpeg"
                  alt="best-offer"
                  data-aos="fade-right"
                  data-aos-once="true"
                />
              </div>
            </div>
          </div>

          <div className="col">
            <div
              className="best-offer-right"
              data-aos="fade-down"
              data-aos-once="true"
            >
              <div className="best-offer-box">
                <h5>FIND THE BEST OFFER</h5>
                <h1>Hassle-Free Shipping and Returns</h1>
                <p>
                  We offer fast and reliable shipping to ensure your fabrics
                  arrive on time. Need to return an item? Our flexible return
                  policy makes it easy. If you're not satisfied with your
                  purchase, contact us for a hassle-free return or exchange.
                </p>

                <button>Buy Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestOffer;
