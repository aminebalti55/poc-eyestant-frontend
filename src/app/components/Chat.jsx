import React, { useState } from 'react';
import { FaPaperPlane, FaMicrophoneAlt } from 'react-icons/fa';
import Button from '@/app/Design/Button';
import Input from '@/app/Design/Input';
import MessageBubble from '@/app/Design/MessageBubble';
import IconWrapper from '@/app/Design/IconWrapper';

const Chat = ({ chatMessages, sendMessage }) => {
  const [newMessage, setNewMessage] = useState('');

  const handleMessageInput = (e) => {
    setNewMessage(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendMessage(newMessage);
      setNewMessage('');
    }
  };

  return (
    <div>
      <div className="mb-4 max-h-48 overflow-y-auto">
        {chatMessages.map((message, index) => (
          <MessageBubble key={index}>
            {message}
          </MessageBubble>
        ))}
      </div>
      <div className="flex">
        <IconWrapper>
          <FaMicrophoneAlt className="mr-2" />
        </IconWrapper>
        <Input
          value={newMessage}
          onChange={handleMessageInput}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
        />
        <Button onClick={() => { sendMessage(newMessage); setNewMessage(''); }}>
          <FaPaperPlane />
        </Button>
      </div>
    </div>
  );
};

export default Chat;
