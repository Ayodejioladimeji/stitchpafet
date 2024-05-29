import React from "react";
import PropTypes from "prop-types";
import Sidebar from "../components/Sidebar";
import Navbar from "@/components/Navbar";

const Layout = ({ children }) => {
  return (
    <div className="dashboard-background">
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-3">
            <Sidebar />
          </div>

          <div className="col-9">{children}</div>
        </div>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.any,
};

export default Layout;
