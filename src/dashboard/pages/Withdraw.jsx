import React from "react";
import { useSelector } from "react-redux";

// COMPONENTS
import Layout from "../common/Layout";
import Withdraws from "./../components/withdraw/Withdraw";
import SEO from "./../../common/SEO";

const Withdraw = () => {
  const { topbar_toggle } = useSelector((state) => state.home);
  return (
    <Layout>
      <SEO title="Withdrawal" />
      <div id={topbar_toggle ? "response" : "responsive"}>
        <Withdraws />
      </div>
    </Layout>
  );
};

export default Withdraw;
