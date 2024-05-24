import React from "react";
import { useSelector } from "react-redux";

// COMPONENTS
import Layout from "../dashboard/common/Layout";
import MyProfile from "../dashboard/components/myprofile/MyProfile";
import SEO from "../common/SEO";

const Profile = () => {
  const { topbar_toggle } = useSelector((state) => state.home);
  return (
    <Layout>
      <div id={topbar_toggle ? "response" : "responsive"}>
        <MyProfile />
      </div>
    </Layout>
  );
};

export default Profile;
