import React from "react";

//
import BreadCumb from "../../styles/components/breadcumb/BreadCumb";
//

const DeliveryInformation = () => {
  return (
    <div className="information">
      <BreadCumb
        header="Delivery Information"
        text="We protect the interests of the transacting parties (both buyer &
          seller) and ensure both parties walk away with satisfaction after the
          transaction is concluded."
        img="/assets/delivery.svg"
      />
    </div>
  );
};

export default DeliveryInformation;
