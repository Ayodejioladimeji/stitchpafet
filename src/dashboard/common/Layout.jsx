import React from "react";
import PropTypes from "prop-types";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "@/components/Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Sidebar />
      {children}
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.any,
};

export default Layout;
