import React from "react";
import Checkouts from "./../components/checkout/Checkout";
import Layout from "./../common/Layout";
import SEO from "./../common/SEO";

const Checkout = () => {
  return (
    <Layout>
      {/* <SEO title="Checkout" /> */}
      <Checkouts />
    </Layout>
  );
};

export default Checkout;
