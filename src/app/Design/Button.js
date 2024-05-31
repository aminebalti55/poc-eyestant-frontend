import React from 'react';

const Button = ({ onClick, children, className }) => (
  <button
    onClick={onClick}
    className={`text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 transition-colors duration-200 ${className}`}
  >
    {children}
  </button>
);

export default Button;
