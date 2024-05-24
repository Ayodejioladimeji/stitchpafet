import React from "react";
import { useSelector } from "react-redux";

// COMPONENTS
import Layout from "../dashboard/common/Layout";
import CreateProducts from "../dashboard/components/myproducts/CreateProduct";
import SEO from "../common/SEO";

const CreateProduct = () => {
  const { topbar_toggle } = useSelector((state) => state.home);

  return (
    <Layout>
      <SEO title="Create Product" />
      <div id={topbar_toggle ? "response" : "responsive"}>
        <CreateProducts />
      </div>
    </Layout>
  );
};

export default CreateProduct;
