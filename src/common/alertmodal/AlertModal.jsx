import React from 'react';

// PACKAGES

// COMPONENTS

const Modal = ({ children }) => {
  return (
    <div className='alert-modalBackground'>
      <div className='alert-modalContainer'>{children}</div>
    </div>
  );
};

export default Modal;
