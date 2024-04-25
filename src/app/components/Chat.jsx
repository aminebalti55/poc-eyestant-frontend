import { useState, useCallback, useRef, useEffect } from 'react';
import { FaPaperPlane, FaMicrophoneAlt } from 'react-icons/fa';

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
          <div key={index} className="bg-gray-100 text-gray-700 py-2 px-4 rounded mb-2">
            {message}
          </div>
        ))}
      </div>
      <div className="flex">
        <div className="mb-2 flex items-center">
          <FaMicrophoneAlt className="mr-2" />
        </div>
        <input
          type="text"
          value={newMessage}
          onChange={handleMessageInput}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => {
            sendMessage(newMessage);
            setNewMessage('');
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default Chat;