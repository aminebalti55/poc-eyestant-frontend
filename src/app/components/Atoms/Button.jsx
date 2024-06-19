'use client';

import React from 'react';
import { FaPhone } from 'react-icons/fa';

const Button = ({ onClick, className, children, icon }) => (
  <button onClick={onClick} className={`p-2 rounded-md flex items-center justify-center ${className}`}>
    {children}
    {icon && <span className="ml-2">{icon}</span>}
  </button>
);

export default Button;
