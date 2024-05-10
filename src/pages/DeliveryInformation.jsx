import React from "react";
import Layout from "../common/Layout";
import SEO from "../common/SEO";
import DeliveryInformations from "./../components/deliveryInformation/DeliveryInformation";

const DeliveryInformation = () => {
  return (
    <Layout>
      {/* <SEO title='About Us' /> */}
      <DeliveryInformations />
    </Layout>
  );
};

export default DeliveryInformation;
