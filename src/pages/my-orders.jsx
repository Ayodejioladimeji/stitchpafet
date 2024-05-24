import React from "react";
import { useSelector } from "react-redux";

// COMPONENTS
import Layout from "../dashboard/common/Layout";
import MyOrder from "../dashboard/components/myorders/MyOrders";
import SEO from "../common/SEO";

const MyOrders = () => {
  const { topbar_toggle } = useSelector((state) => state.home);

  return (
    <Layout>
      <SEO title="My Orders" />
      <div id={topbar_toggle ? "response" : "responsive"}>
        <MyOrder />
      </div>
    </Layout>
  );
};

export default MyOrders;
