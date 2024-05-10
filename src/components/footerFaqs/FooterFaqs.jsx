import React from "react";

//
import BreadCumb from "../../styles/components/breadcumb/BreadCumb";
//

const FooterFaqs = () => {
  return (
    <div className="footer-faqs">
      <BreadCumb
        header="Frequently Asked Questions"
        text="We protect the interests of the transacting parties (both buyer &
          seller) and ensure both parties walk away with satisfaction after the
          transaction is concluded."
        img="/assets/questions.svg"
      />
    </div>
  );
};

export default FooterFaqs;
