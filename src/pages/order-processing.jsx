import React from "react";
import { useSelector } from "react-redux";

// COMPONENTS
import Layout from "../dashboard/common/Layout";
import OrdersProcessing from "../dashboard/components/orderprocessing/OrderProcessing";
import SEO from "../common/SEO";

const OrderProcessing = () => {
  const { topbar_toggle } = useSelector((state) => state.home);
  return (
    <Layout>
      <SEO title="Order Processing" />
      <div id={topbar_toggle ? "response" : "responsive"}>
        <OrdersProcessing />
      </div>
    </Layout>
  );
};

export default OrderProcessing;
