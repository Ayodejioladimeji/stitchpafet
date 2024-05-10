import React from "react";
import Carts from "./../components/cart/Cart";
import Layout from "./../common/Layout";
import SEO from "./../common/SEO";

const Cart = () => {
  return (
    <Layout>
      {/* <SEO title="Cart" /> */}
      <Carts />
    </Layout>
  );
};

export default Cart;
