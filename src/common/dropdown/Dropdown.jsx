import React from 'react';

const Dropdown = ({ children }) => {
  return (
    <div className='dropdowns'>
      <div className='drop-children'>{children}</div>
    </div>
  );
};

export default Dropdown;
