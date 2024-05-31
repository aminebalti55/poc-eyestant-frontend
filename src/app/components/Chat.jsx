"use client";

import React, { useState, useEffect, useRef } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import Input from '@/app/Design/Input';
import IconWrapper from '@/app/Design/IconWrapper';
import './style.css';

const Chat = ({ chatMessages, sendMessage, username }) => {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  const handleMessageInput = (e) => {
    setNewMessage(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendMessage(newMessage);
      setNewMessage('');
    }
  };

  const formatTime = (date) => {
    return `${date.getHours()}:${date.getMinutes()}`;
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  return (
    <div className="chat bg-white p-4 rounded-lg shadow-lg h-full flex flex-col">
      <h2 className="text-lg font-semibold mb-4 text-[#2B3674]">Chat</h2>
      <div className="chat-messages mb-4 flex-grow overflow-y-auto pr-2">
        {chatMessages.map((message, index) => (
          <div key={index} className="mb-4">
            <div className="text-xs text-gray-500 mb-1">
              <span className="font-bold">{message.username}</span>{' '}
              <span className="font-light">{formatTime(new Date(message.time))}</span>
            </div>
            <div
              className={`p-2 rounded-lg ${
                message.username === username ? 'bg-[#4318FF] text-white' : 'bg-[#F4F7FE] text-black'
              }`}
              style={{
                maxWidth: '80%',
                alignSelf: message.username === username ? 'flex-end' : 'flex-start',
                borderRadius: '15px',
                position: 'relative',
                marginBottom: '10px',
              }}
            >
              {message.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>
      <div className="flex">
        <Input
          value={newMessage}
          onChange={handleMessageInput}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="flex-grow"
        />
        <IconWrapper onClick={() => { sendMessage(newMessage); setNewMessage(''); }}>
          <FaPaperPlane className="text-[#4318FF]" />
        </IconWrapper>
      </div>
    </div>
  );
};

export default Chat;
