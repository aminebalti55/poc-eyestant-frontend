'use client';

import React from 'react';

const Input = ({ label, name, value, onChange, type = 'text', className }) => (
  <div className="mb-4">
    <label className="block text-gray-700 dark:text-dark-subtext mb-2">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white ${className}`}
    />
  </div>
);

export default Input;
