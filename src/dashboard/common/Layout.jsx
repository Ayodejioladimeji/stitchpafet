import React from "react";
import PropTypes from "prop-types";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "@/components/Navbar";

const Layout = ({ children }) => {
  return (
    <div className="container-fluid p-0">
      <Navbar />
      <Sidebar />
      {children}
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.any,
};

export default Layout;
