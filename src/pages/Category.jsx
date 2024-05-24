import React from "react";
import Layout from "../common/Layout";
import Categories from "../components/categories/Categories";
import SEO from "../common/SEO";

const Category = () => {
  return (
    <Layout>
      {/* <SEO title="Categories" /> */}
      <Categories />
    </Layout>
  );
};

export default Category;
