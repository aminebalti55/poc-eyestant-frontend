import React from 'react';

const IconWrapper = ({ children, className }) => (
  <div className={`mb-2 flex items-center ${className}`}>
    {children}
  </div>
);

export default IconWrapper;
