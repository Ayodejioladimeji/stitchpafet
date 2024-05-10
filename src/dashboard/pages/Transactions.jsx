import React from "react";
import { useSelector } from "react-redux";

// COMPONENTS
import Layout from "../common/Layout";
import MyTransactions from "./../components/mytransactions/MyTransactions";
import SEO from "./../../common/SEO";

const Transactions = () => {
  const { topbar_toggle } = useSelector((state) => state.home);

  return (
    <Layout>
      <SEO title="Transactions" />
      <div id={topbar_toggle ? "response" : "responsive"}>
        <MyTransactions />
      </div>
    </Layout>
  );
};

export default Transactions;
