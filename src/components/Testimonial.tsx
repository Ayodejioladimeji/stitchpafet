import React from "react";
import Heading from "./heading/Heading";
import Swiper from "./Swiper";

const Testimonial = () => {
  //
  return (
    <div className="testimonial">
      <div className="container">

        <Heading heading="Hear from Our Happy Customers" text="Discover what our customers have to say about their experiences shopping with us. We take pride in providing high-quality products and exceptional service, and nothing makes us happier than hearing from satisfied customers like you." />

        <Swiper />
      </div>
    </div>
  );
};

export default Testimonial;
