import React from "react";
import { useSelector } from "react-redux";

// COMPONENTS
import Layout from "./../common/Layout";
import PayProcessing from "./../components/transactionprocessing/Processing";
import SEO from "./../../common/SEO";

const Processing = () => {
  const { topbar_toggle } = useSelector((state) => state.home);
  return (
    <Layout>
      <SEO title="Processing" />
      <div id={topbar_toggle ? "response" : "responsive"}>
        <PayProcessing />
      </div>
    </Layout>
  );
};

export default Processing;
