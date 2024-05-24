import React from "react";

//

interface Props {
  heading: string;
  text?: string
}

const Heading = (props: Props) => {
  return (
    <>
      <h1 className="header-heading" data-aos="fade-down" data-aos-once="true">
        {props?.heading}
      </h1>
      <p className="header-paragraph" data-aos="fade-up" data-aos-once="true">
        {props?.text}
      </p>
    </>
  );
};

export default Heading;
