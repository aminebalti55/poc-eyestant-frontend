import React, { useEffect, useRef, useState } from 'react';
import { LuScreenShare, LuScreenShareOff } from "react-icons/lu";
import { BsPerson, BsMicMuteFill, BsMicMute, BsCameraVideo, BsCameraVideoOff, BsTelephoneXFill } from "react-icons/bs";
import { CiMinimize1, CiMaximize1 } from "react-icons/ci";
import Button from '@/app/Design/Button';
import VideoContainer from '@/app/Design/VideoContainer';

const VideoChat = ({ roomId, peer, remoteVideoRef, localStream, leaveRoom, isScreenSharing, toggleScreenShare, screenSharingStream }) => {
  const localVideoRef = useRef(null);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [showIcons, setShowIcons] = useState(false);
  const [isMainVideoMaximized, setIsMainVideoMaximized] = useState(false);
  const [remoteStreams, setRemoteStreams] = useState([]);

  useEffect(() => {
    if (localVideoRef.current) {
      if (isScreenSharing && screenSharingStream.current) {
        localVideoRef.current.srcObject = screenSharingStream.current;
      } else if (localStream.current) {
        localVideoRef.current.srcObject = localStream.current;
      }
    }
  }, [isScreenSharing, localStream, screenSharingStream, localVideoRef]);

  useEffect(() => {
    const handleRemoteStreamReceived = (event) => {
      const remoteStream = event.detail;
      if (remoteStream !== localStream.current) {
        setRemoteStreams((prevStreams) => [...prevStreams, remoteStream]);
      }
    };

    window.addEventListener('remoteStreamReceived', handleRemoteStreamReceived);

    if (peer) {
      peer.ontrack = (event) => {
        const remoteStream = event.streams[0];
        if (remoteStream !== localStream.current) {
          setRemoteStreams((prevStreams) => [...prevStreams, remoteStream]);
        }
      };
    }

    return () => {
      window.removeEventListener('remoteStreamReceived', handleRemoteStreamReceived);
    };
  }, [peer, localStream]);

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
      <VideoContainer
        srcObject={remoteStreams.length > 0 ? remoteStreams[0] : localStream.current}
        isMain={isMainVideoMaximized}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {showIcons && (
          <div className="absolute bottom-4 right-4 flex space-x-2">
            <Button onClick={toggleMainVideoSize}>
              {isMainVideoMaximized ? <CiMinimize1 size={20} /> : <CiMaximize1 size={20} />}
            </Button>
            <Button onClick={toggleScreenShare}>
              {isScreenSharing ? <LuScreenShareOff size={20} /> : <LuScreenShare size={20} />}
            </Button>
            <Button onClick={toggleMic}>
              {isMicOn ? <BsMicMuteFill size={20} /> : <BsMicMute size={20} />}
            </Button>
            <Button onClick={toggleCamera}>
              {isCameraOn ? <BsCameraVideo size={20} /> : <BsCameraVideoOff size={20} />}
            </Button>
            <Button onClick={leaveRoom} className="bg-red-500 hover:bg-red-600">
              <BsTelephoneXFill size={20} />
            </Button>
          </div>
        )}
      </VideoContainer>
      <div className={`${isMainVideoMaximized ? 'md:col-span-1 grid grid-cols-1 grid-rows-2 gap-4' : 'md:col-span-1 aspect-video'} bg-gray-200 rounded-lg overflow-hidden shadow-lg`}>
        {remoteStreams.length > 1 ? (
          remoteStreams.slice(1).map((remoteStream, index) => (
            <VideoContainer key={index} srcObject={remoteStream} />
          ))
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
