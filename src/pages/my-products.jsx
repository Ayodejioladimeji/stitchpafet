import React from "react";
import { useSelector } from "react-redux";
import Layout from "../dashboard/common/Layout";
import MyProduct from "../dashboard/components/myproducts/MyProducts";
import SEO from "../common/SEO";

const MyProducts = () => {
  const { topbar_toggle } = useSelector((state) => state.home);

  return (
    <Layout>
      <SEO title="Vendor Products" />
      <div id={topbar_toggle ? "response" : "responsive"}>
        <MyProduct />
      </div>
    </Layout>
  );
};

export default MyProducts;
