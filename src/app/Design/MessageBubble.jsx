import React from 'react';

const MessageBubble = ({ message }) => {
  const { text, sender, time } = message;

  return (
    <div className="mb-4">
      <div className="flex flex-col bg-[#4318FF] text-white p-3 rounded-lg">
        <span className="font-bold">{sender}</span>
        <span className="text-sm">{text}</span>
        <span className="text-xs mt-1 text-right">{time}</span>
      </div>
    </div>
  );
};

export default MessageBubble;
