import React from "react";
import Search from "../../components/search/Search";
import AllProduct from "../../components/allproducts/AllProducts";
import Layout from "../../common/Layout";
import Breadcumb from "@/components/Breadcumb";


const Products = () => {
  return (
    <Layout>
      <div className="products">
        <Breadcumb title="Shop" />
        <div className="container">
          <Search />
          <AllProduct />
        </div>
      </div>
    </Layout>
  );
};

export default Products;
