import React from 'react';

const Modal = ({ onClose, children }) => (
  <div
    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    onClick={onClose} 
  >
    <div
      className="bg-white rounded-lg shadow-lg p-8 max-w-md"
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  </div>
);

export default Modal;
