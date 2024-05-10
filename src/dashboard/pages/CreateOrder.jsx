import React from "react";
import { useSelector } from "react-redux";

// COMPONENTS
import Layout from "../common/Layout";
import { Steps } from "../components/createorder/Steps";
import SEO from "./../../common/SEO";

const CreateOrder = () => {
  const { topbar_toggle } = useSelector((state) => state.home);

  return (
    <Layout>
      <SEO title="Create Order" />
      <div id={topbar_toggle ? "response" : "responsive"}>
        <Steps />
      </div>
    </Layout>
  );
};

export default CreateOrder;
