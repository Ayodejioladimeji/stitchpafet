import React from "react";

//
import BreadCumb from "../../styles/components/breadcumb/BreadCumb";
//

const About = () => {
  return (
    <div className="about">
      <BreadCumb
        header="About Us"
        text="We protect the interests of the transacting parties (both buyer &
          seller) and ensure both parties walk away with satisfaction after the
          transaction is concluded."
        img="/assets/about-us.svg"
      />
    </div>
  );
};

export default About;
