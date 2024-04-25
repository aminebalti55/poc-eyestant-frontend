import { useState, useCallback, useRef, useEffect } from 'react';
import { FaUserFriends } from 'react-icons/fa';

const RoomLinkSection = ({ roomLink }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyRoomLink = () => {
    navigator.clipboard.writeText(roomLink);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  return (
    <div className="mb-8">
      <p className="text-gray-600 font-semibold mb-2 flex items-center">
        <FaUserFriends className="mr-2" /> Room Link:
      </p>
      <div className="flex items-center mb-4">
        <input
          type="text"
          value={roomLink}
          readOnly
          className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={copyRoomLink}
          className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-2 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${isCopied ? 'opacity-50 cursor-default' : ''}`}
          disabled={isCopied}
        >
          {isCopied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </div>
  );
};

export default RoomLinkSection;