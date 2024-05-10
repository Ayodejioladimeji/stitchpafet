import React from "react";

const TopbarDropdown = ({ children }) => {
  return (
    <div className="topbar-dropdowns">
      <div className="drop-children">{children}</div>
    </div>
  );
};

export default TopbarDropdown;
