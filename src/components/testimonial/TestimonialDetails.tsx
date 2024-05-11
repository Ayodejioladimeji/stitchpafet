import React from "react";

const TestimonialDetails = ({ testimonialDetail }) => {
  const { img, name, address, description } = testimonialDetail;

  return (
    <div className="item">
      <div className="item-card">
        <p>{description}</p>
      </div>

      <div className="item-boxs">
        <img src={img} alt="" className="items-image" />

        <h4>{name}</h4>
        <p>{address}</p>
      </div>
    </div>
  );
};

export default TestimonialDetails;
