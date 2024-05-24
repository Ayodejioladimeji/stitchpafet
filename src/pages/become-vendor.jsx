import React from "react";
import { useSelector } from "react-redux";

// COMPONENTS
import Layout from "../dashboard/common/Layout";
import Becomevendor from "../dashboard/components/becomevendor/Becomevendor";
import SEO from "../common/SEO";

const BecomeVendor = () => {
  const { topbar_toggle } = useSelector((state) => state.home);
  return (
    <Layout>
      <SEO title="Become a Vendor" />
      <div id={topbar_toggle ? "response" : "responsive"}>
        <Becomevendor />
      </div>
    </Layout>
  );
};

export default BecomeVendor;
