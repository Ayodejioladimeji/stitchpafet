import React from "react";

//
import BreadCumb from "../../styles/components/breadcumb/BreadCumb";
//

const PaymentOptions = () => {
  return (
    <div className="payment-options">
      <BreadCumb
        header="Payment Options"
        text="We protect the interests of the transacting parties (both buyer &
          seller) and ensure both parties walk away with satisfaction after the
          transaction is concluded."
        img="/assets/payment.svg"
      />
    </div>
  );
};

export default PaymentOptions;
