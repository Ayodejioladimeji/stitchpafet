import React from "react";
import { useSelector } from "react-redux";

// COMPONENTS
import Layout from "./../common/Layout";
import SendFunds from "./../components/sendfunds/SendFunds";
import SEO from "./../../common/SEO";

const SendMoney = () => {
  const { topbar_toggle } = useSelector((state) => state.home);
  return (
    <Layout>
      <SEO title="Send Money" />
      <div id={topbar_toggle ? "response" : "responsive"}>
        <SendFunds />
      </div>
    </Layout>
  );
};

export default SendMoney;
