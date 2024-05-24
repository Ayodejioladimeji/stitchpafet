import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

const Navlink = ({ to, children }) => {
  const router = useRouter();
  const { pathname } = router.query;

  //
  return (
    <Link
      href={to}
      className={pathname === to ? "menu-item active" : "menu-item"}
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
