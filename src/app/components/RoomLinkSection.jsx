import React, { useState } from 'react';
import { FaUserFriends } from 'react-icons/fa';
import Button from '@/app/Design/Button';
import Input from '@/app/Design/Input';

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
        <Input
          type="text"
          value={roomLink}
          readOnly
        />
        <Button
          onClick={copyRoomLink}
          className={isCopied ? 'opacity-50 cursor-default' : ''}
          disabled={isCopied}
        >
          {isCopied ? 'Copied!' : 'Copy'}
        </Button>
      </div>
    </div>
  );
};

export default RoomLinkSection;
