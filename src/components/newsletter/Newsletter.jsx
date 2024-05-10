import React from "react";

const Newsletter = () => {
  return (
    <div className="newsletter">
      <h2 data-aos="fade-down" data-aos-once="true">
        Subscribe to our Newsletter
      </h2>
      <div className="newsletter-div">
        {/* <h3>Verified</h3> */}
        <div
          className="newsletter-input-box"
          data-aos="fade-up"
          data-aos-once="true"
        >
          <input type="text" placeholder="enter your email address" />
          <button>Subscribe</button>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
