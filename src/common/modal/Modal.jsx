import React from 'react';

// PACKAGES

// COMPONENTS

const Modal = ({ children }) => {
  return (
    <div className='modalBackground'>
      <div className='modalContainer'>{children}</div>
    </div>
  );
};

export default Modal;
