import React from 'react';

const MessageBubble = ({ children, className }) => (
  <div className={`bg-gray-100 text-gray-700 py-2 px-4 rounded mb-2 ${className}`}>
    {children}
  </div>
);

export default MessageBubble;
