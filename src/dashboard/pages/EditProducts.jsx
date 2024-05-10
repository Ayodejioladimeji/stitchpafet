import React from "react";
import { useSelector } from "react-redux";

// COMPONENTS
import Layout from "../common/Layout";
import EditProduct from "./../components/myproducts/EditProduct";
import SEO from "./../../common/SEO";

const EditProducts = () => {
  const { topbar_toggle } = useSelector((state) => state.home);

  return (
    <Layout>
      <SEO title="Edit Product" />
      <div id={topbar_toggle ? "response" : "responsive"}>
        <EditProduct />
      </div>
    </Layout>
  );
};

export default EditProducts;
