import React from "react";
import { useSelector } from "react-redux";

// COMPONENTS
import Layout from "../dashboard/common/Layout";
import { Steps } from "../dashboard/components/createorder/Steps";
import SEO from "../common/SEO";

const CreateOrder = () => {
  const { topbar_toggle } = useSelector((state) => state.home);

  return (
    <Layout>
      <div id={topbar_toggle ? "response" : "responsive"}>
        <Steps />
      </div>
    </Layout>
  );
};

export default CreateOrder;
