'use client';
import { useEffect, useRef, useState } from 'react';
import { LuScreenShare } from "react-icons/lu";
import { LuScreenShareOff } from "react-icons/lu";
import { BsPerson, BsMicMuteFill, BsMicMute, BsCameraVideo, BsCameraVideoOff, BsTelephoneXFill } from "react-icons/bs";
import { CiMinimize1, CiMaximize1 } from "react-icons/ci";

const VideoChat = ({ roomId, peer, remoteVideoRef, localStream, leaveRoom, isScreenSharing, toggleScreenShare, screenSharingStream }) => {
  const localVideoRef = useRef(null);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [showIcons, setShowIcons] = useState(false);
  const [isMainVideoMaximized, setIsMainVideoMaximized] = useState(false);

  useEffect(() => {
    if (localStream.current && localVideoRef.current) {
      if (isScreenSharing && screenSharingStream.current) {
        localVideoRef.current.srcObject = screenSharingStream.current;
      } else {
        localVideoRef.current.srcObject = localStream.current;
      }
    }
  }, [isScreenSharing, localStream, screenSharingStream, localVideoRef]);

  useEffect(() => {
    if (peer) {
      const handleRemoteStream = (remoteStream) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = remoteStream;
        }
      };

      peer.on('stream', handleRemoteStream);

      return () => {
        peer.off('stream', handleRemoteStream);
      };
    }
  }, [peer]);

  const toggleMic = () => {
    localStream.current.getAudioTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });
    setIsMicOn(!isMicOn);
  };

  const toggleCamera = () => {
    localStream.current.getVideoTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });
    setIsCameraOn(!isCameraOn);
  };

  const handleMouseEnter = () => {
    setShowIcons(true);
  };

  const handleMouseLeave = () => {
    setShowIcons(false);
  };

  const toggleMainVideoSize = () => {
    setIsMainVideoMaximized(!isMainVideoMaximized);
  };

  return (
    <div className={`grid ${isMainVideoMaximized ? 'md:grid-cols-4' : 'md:grid-cols-2'} gap-4 h-full`}>
      <div className={`${isMainVideoMaximized ? 'md:col-span-3' : 'md:col-span-1'} h-full bg-white rounded-lg overflow-hidden relative shadow-lg`}>
        <div
          className="w-full h-full relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {(localStream.current || screenSharingStream.current) ? (
            <video ref={localVideoRef} autoPlay muted={isMicOn} className="w-full h-full object-cover" />
          ) : (
            <div className="flex items-center justify-center w-full h-full">
              <BsPerson size={48} className="text-gray-400" />
            </div>
          )}
          {showIcons && (
            <div className="absolute bottom-4 right-4 flex space-x-2">
              <button
                onClick={toggleMainVideoSize}
                className="p-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors duration-200"
              >
                {isMainVideoMaximized ? <CiMinimize1 size={20} /> : <CiMaximize1 size={20} />}
              </button>
              <button
                onClick={toggleScreenShare}
                className="p-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors duration-200"
              >
                {isScreenSharing ? <LuScreenShareOff size={20} /> : <LuScreenShare size={20} />}
              </button>
              <button
                onClick={toggleMic}
                className="p-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors duration-200"
              >
                {isMicOn ? <BsMicMuteFill size={20} /> : <BsMicMute size={20} />}
              </button>
              <button
                onClick={toggleCamera}
                className="p-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors duration-200"
              >
                {isCameraOn ? <BsCameraVideo size={20} /> : <BsCameraVideoOff size={20} />}
              </button>
              <button
                onClick={leaveRoom}
                className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors duration-200"
              >
                <BsTelephoneXFill size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
      <div className={`${isMainVideoMaximized ? 'md:col-span-1' : 'md:col-span-1 aspect-video'} bg-gray-200 rounded-lg overflow-hidden shadow-lg`}>
        {isMainVideoMaximized ? (
          <div className="grid md:grid-rows-3 md:gap-4 h-full">
            <div className="w-25 h-25 md:w-25 md:h-25 bg-gray-300 rounded-lg overflow-hidden flex items-center justify-center">
              {remoteVideoRef.current && remoteVideoRef.current.srcObject ? (
                <video ref={remoteVideoRef} autoPlay className="w-full h-full object-cover" />
              ) : (
                <BsPerson size={24} className="text-gray-400" />
              )}
            </div>
            <div className="w-25 h-25 md:w-25 md:h-25 bg-gray-300 rounded-lg overflow-hidden flex items-center justify-center">
              <BsPerson size={24} className="text-gray-400" />
            </div>
            <div className="w-25 h-25 md:w-25 md:h-25 bg-gray-300 rounded-lg overflow-hidden flex items-center justify-center">
              <BsPerson size={24} className="text-gray-400" />
            </div>
          </div>
        ) : remoteVideoRef.current && remoteVideoRef.current.srcObject ? (
          <video ref={remoteVideoRef} autoPlay className="w-full h-full object-cover" />
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <BsPerson size={48} className="text-gray-400" />
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoChat;