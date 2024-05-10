import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

const Navlink = ({ to, children }) => {
  const { pathname } = useLocation();
  return (
    <Link
      to={to}
      className={pathname === to ? 'menu-item active' : 'menu-item'}
    >
      {children}
    </Link>
  );
};

Navlink.propTypes = {
  to: PropTypes.string,
  children: PropTypes.any,
};
export default Navlink;
