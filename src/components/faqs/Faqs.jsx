import React from "react";

//
import Accordion from "./Accordion";
import Heading from "../heading/Heading";

const Faqs = () => {
  return (
    <div className="faqs">
      <Heading
        heading="Frequently asked questions"
        text="Get answers to all questions you have and boost your knowledge about
        Verifibiz."
      />

      <div className="faqs-div">
        <div className="faqs-left" data-aos="fade-right" data-aos-once="true">
          <img src="/images/faqimage.jpg" alt="" />
        </div>

        <div className="faqs-right">
          <Accordion />
        </div>
      </div>
    </div>
  );
};

export default Faqs;
