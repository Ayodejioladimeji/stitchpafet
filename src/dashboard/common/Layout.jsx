import React from 'react';
import PropTypes from 'prop-types';
import Topbar from '../topbar/Topbar';
import Sidebar from '../sidebar/Sidebar';

const Layout = ({ children }) => {
  return (
    <>
      <Topbar />
      <Sidebar />
      {children}
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.any,
};

export default Layout;
