'use client';

import React from 'react';

const Input = ({ label, name, value, onChange, type = 'text', className, placeholder, icon }) => (
  <div className="mb-4">
    {label && <label className="block text-gray-700 dark:text-dark-subtext mb-2">{label}</label>}
    <div className="relative">
      {icon && (
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </span>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white ${icon ? 'pl-10' : ''} ${className}`}
      />
    </div>
  </div>
);

export default Input;
