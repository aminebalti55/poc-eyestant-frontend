import React from 'react';

const Button = ({ onClick, children, className }) => (
  <button
    onClick={onClick}
    className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${className}`}
  >
    {children}
  </button>
);

export default Button;
