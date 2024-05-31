import React from 'react';

const Input = ({ value, onChange, onKeyDown, placeholder, className }) => (
  <input
    value={value}
    onChange={onChange}
    onKeyDown={onKeyDown}
    placeholder={placeholder}
    className={`p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
  />
);

export default Input;
