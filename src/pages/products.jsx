import React from "react";
import AllProductsBanner from "../components/allproducts/AllProductsBanner";
import Search from "../components/search/Search";
import AllProduct from "../components/allproducts/AllProducts";
import Layout from "../common/Layout";
import SEO from "../common/SEO";

const Products = () => {
  return (
    <Layout>
      {/* <SEO title="All Products" /> */}
      <AllProductsBanner />
      <Search />
      <AllProduct />
    </Layout>
  );
};

export default Products;
