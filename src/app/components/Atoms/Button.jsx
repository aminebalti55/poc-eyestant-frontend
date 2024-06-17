'use client';

import React from 'react';

const Button = ({ onClick, className, children }) => (
  <button onClick={onClick} className={`p-2 rounded-md ${className}`}>
    {children}
  </button>
);

export default Button;
