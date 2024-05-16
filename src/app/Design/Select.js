import React from 'react';

const Select = ({ id, value, onChange, children, className }) => (
  <select
    id={id}
    value={value}
    onChange={onChange}
    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${className}`}
  >
    {children}
  </select>
);

export default Select;
