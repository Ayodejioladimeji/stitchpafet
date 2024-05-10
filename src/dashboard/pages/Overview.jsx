import React from "react";
import { useSelector } from "react-redux";
import Layout from "../common/Layout";
import OverviewPage from "./../components/overviewpage/OverviewPage";
import SEO from "./../../common/SEO";

//
const Overview = () => {
  const { topbar_toggle } = useSelector((state) => state.home);

  return (
    <Layout>
      <SEO title="Dashboard" />
      <div id={topbar_toggle ? "response" : "responsive"}>
        <OverviewPage />
      </div>
    </Layout>
  );
};

export default Overview;
