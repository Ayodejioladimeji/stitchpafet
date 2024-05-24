import React from "react";
import Layout from "../common/Layout";
import SEO from "../common/SEO";
import PaymentOption from "../components/paymentoptions/PaymentOptions";

const PaymentOptions = () => {
  return (
    <Layout>
      {/* <SEO title='Payment Options' /> */}
      <PaymentOption />
    </Layout>
  );
};

export default PaymentOptions;
