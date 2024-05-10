import React from "react";
import { useSelector } from "react-redux";
import Wallets from "../components/wallets/Wallets";

// COMPONENTS
import Layout from "./../common/Layout";
import SEO from "./../../common/SEO";

const Wallet = () => {
  const { topbar_toggle } = useSelector((state) => state.home);
  return (
    <Layout>
      <SEO title="Wallet" />
      <div id={topbar_toggle ? "response" : "responsive"}>
        <Wallets />
      </div>
    </Layout>
  );
};

export default Wallet;
