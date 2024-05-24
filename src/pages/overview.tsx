import React from "react";
import { useSelector } from "react-redux";
import Layout from "../dashboard/common/Layout";
import OverviewPage from "../dashboard/components/overviewpage/OverviewPage";
import SEO from "../common/SEO";

//
const Overview = () => {
  const { topbar_toggle } = useSelector((state: any) => state.home);

  return (
    <Layout>
      <div id={topbar_toggle ? "response" : "responsive"}>
        <OverviewPage />
      </div>
    </Layout>
  );
};

export default Overview;
