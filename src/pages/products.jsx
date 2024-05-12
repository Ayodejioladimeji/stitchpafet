import React from "react";
import AllProductsBanner from "../components/allproducts/AllProductsBanner";
import Search from "../components/search/Search";
import AllProduct from "../components/allproducts/AllProducts";
import Layout from "../common/Layout";
import SEO from "../common/SEO";

const Products = () => {
  return (
    <Layout>
      <div className="products">
        <div className="container">
          <Search />
          <AllProduct />
        </div>
      </div>
    </Layout>
  );
};

export default Products;
