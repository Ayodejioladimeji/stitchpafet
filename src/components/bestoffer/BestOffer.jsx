import React from "react";

const BestOffer = () => {
  return (
    <div className="best-offer">
      <div className="best-offer-left">
        <div className="image-box">
          <img
            src="/images/four.jpeg"
            alt="best-offer"
            data-aos="fade-right"
            data-aos-once="true"
          />
        </div>
      </div>

      <div
        className="best-offer-left"
        data-aos="fade-down"
        data-aos-once="true"
      >
        <div className="best-offer-box">
          <h5>FIND THE BEST OFFER</h5>
          <h1>
            Get up to 25% discount from the best producer of quality products
          </h1>
          <p>
            With our filter feature,you can easily search the range of product
            price you can afford and the location convenient for you. Sounds
            interesting?
          </p>

          <button>Learn more</button>
        </div>
      </div>
    </div>
  );
};

export default BestOffer;
