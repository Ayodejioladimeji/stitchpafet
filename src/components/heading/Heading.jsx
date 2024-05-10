import React from "react";

//

const Heading = ({ heading, text }) => {
  return (
    <>
      <h1 className="header-heading" data-aos="fade-down" data-aos-once="true">
        {heading}
      </h1>
      <p className="header-paragraph" data-aos="fade-up" data-aos-once="true">
        {text}
      </p>
    </>
  );
};

export default Heading;
