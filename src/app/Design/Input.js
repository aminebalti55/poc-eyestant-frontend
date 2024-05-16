import React from 'react';

const Input = ({ value, onChange, onKeyDown, placeholder, className }) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    onKeyDown={onKeyDown}
    placeholder={placeholder}
    className={`flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
  />
);

export default Input;
