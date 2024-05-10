import React from "react";
import TestimonialDetails from "./TestimonialDetails";
import OwlCarousel from "react-owl-carousel";
import Heading from "./../heading/Heading";
import { testimonials } from "./../../constants/testimonials";

const Testimonial = () => {
  //Owl Carousel Settings

  const options = {
    loop: true,
    center: true,
    items: 3,
    margin: 0,
    autoplay: true,
    dots: true,
    autoplayTimeout: 8500,
    smartSpeed: 450,
    nav: false,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 3,
      },
    },
  };

  return (
    <div className="testimonial">
      <Heading heading="Testimonials" text="Hear what people say about us" />

      <OwlCarousel
        id="customer-testimonials"
        className="owl-carousel owl-theme"
        {...options}
      >
        {testimonials.map((item, key) => {
          return <TestimonialDetails testimonialDetail={item} key={key} />;
        })}
      </OwlCarousel>
    </div>
  );
};

export default Testimonial;
