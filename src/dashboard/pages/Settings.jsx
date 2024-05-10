import React from "react";
import { useSelector } from "react-redux";

// COMPONENTS
import Layout from "./../common/Layout";
import Setting from "./../components/settings/Setting";
import SEO from "./../../common/SEO";

const Settings = () => {
  const { topbar_toggle } = useSelector((state) => state.home);
  return (
    <Layout>
      <SEO title="Settings" />
      <div id={topbar_toggle ? "response" : "responsive"}>
        <Setting />
      </div>
    </Layout>
  );
};

export default Settings;
