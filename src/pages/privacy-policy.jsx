import React from "react";
import Layout from "../common/Layout";
import SEO from "../common/SEO";
import PrivacyPolicys from "../components/privacypolicy/PrivacyPolicy";

const PrivacyPolicy = () => {
  return (
    <Layout>
      {/* <SEO title='Privacy Policy' /> */}
      <PrivacyPolicys />
    </Layout>
  );
};

export default PrivacyPolicy;
