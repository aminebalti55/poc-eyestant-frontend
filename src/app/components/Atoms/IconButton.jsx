'use client';

import React from 'react';
import { FaPlus, FaMinus, FaEye, FaKey } from 'react-icons/fa';

const icons = {
  plus: FaPlus,
  minus: FaMinus,
  eye: FaEye,
  key: FaKey,
};

const IconButton = ({ icon, onClick, className, size = 12 }) => {
  const IconComponent = icons[icon];
  return (
    <button onClick={onClick} className={`rounded-full p-1 ${className}`}>
      <IconComponent size={size} />
    </button>
  );
};

export default IconButton;
