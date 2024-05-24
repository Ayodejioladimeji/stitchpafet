import React from "react";
import { useSelector } from "react-redux";
import Layout from "../dashboard/common/Layout";
import Orderdispute from "../dashboard/components/orderdisputes/Orderdispute";
import SEO from "../common/SEO";

const Disputes = () => {
  const { topbar_toggle } = useSelector((state) => state.home);

  return (
    <Layout>
      <SEO title="Dispute" />
      <div id={topbar_toggle ? "response" : "responsive"}>
        <Orderdispute />
      </div>
    </Layout>
  );
};

export default Disputes;
