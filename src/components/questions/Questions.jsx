import React from "react";
import { BsFillQuestionDiamondFill } from "react-icons/bs";

//
import Heading from "./../heading/Heading";

const Questions = () => {
  return (
    <div className="questions">
      <BsFillQuestionDiamondFill
        className="questions-icon"
        data-aos="fade-down"
        data-aos-once="true"
      />
      <Heading
        heading="Get
        in
        Touch
        with
        Us"
        text="Have questions or need assistance? Our dedicated customer support team is here to help. Contact us via email, phone, or live chat, and we'll be happy to assist you with any inquiries or concerns. Your satisfaction is our top priority."
      />

      <button data-aos="fade-up" data-aos-once="true">
        Help
      </button>
    </div>
  );
};

export default Questions;
