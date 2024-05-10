import React from "react";
import { useSelector } from "react-redux";

// COMPONENTS
import Layout from "../common/Layout";

import MyOrdersDetail from "./../components/myordersdetails/servicedetails/MyOrdersDetails";
import SEO from "./../../common/SEO";

const MyOrdersDetails = () => {
  const { topbar_toggle } = useSelector((state) => state.home);

  return (
    <Layout>
      <SEO title="Order Details" />
      <div id={topbar_toggle ? "response" : "responsive"}>
        <MyOrdersDetail />
      </div>
    </Layout>
  );
};

export default MyOrdersDetails;
