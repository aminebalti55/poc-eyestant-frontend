"use client";

import React, { useEffect, useRef, useState } from 'react';
import { LuScreenShare, LuScreenShareOff } from "react-icons/lu";
import { BsMicMuteFill, BsMicMute, BsCameraVideo, BsCameraVideoOff, BsTelephoneXFill } from "react-icons/bs";
import Button from '@/app/Design/Button';
import VideoContainer from '@/app/Design/VideoContainer';

const VideoChat = ({ roomId, peer, localStream, leaveRoom, isScreenSharing, toggleScreenShare, screenSharingStream }) => {
  const localVideoRef = useRef(null);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [remoteStreams, setRemoteStreams] = useState([]);

  useEffect(() => {
    if (localVideoRef.current) {
      if (isScreenSharing && screenSharingStream.current) {
        localVideoRef.current.srcObject = screenSharingStream.current;
      } else if (localStream.current) {
        localVideoRef.current.srcObject = localStream.current;
      }
    }
  }, [isScreenSharing, localStream, screenSharingStream]);

  useEffect(() => {
    const handleRemoteStreamReceived = (event) => {
      const remoteStream = event.detail.stream;
      setRemoteStreams((prevStreams) => {
        if (!prevStreams.includes(remoteStream)) {
          return [...prevStreams, remoteStream];
        }
        return prevStreams;
      });
    };

    window.addEventListener('remoteStreamReceived', handleRemoteStreamReceived);

    if (peer) {
      peer.ontrack = (event) => {
        const remoteStream = event.streams[0];
        setRemoteStreams((prevStreams) => {
          if (!prevStreams.includes(remoteStream)) {
            return [...prevStreams, remoteStream];
          }
          return prevStreams;
        });
      };
    }

    return () => {
      window.removeEventListener('remoteStreamReceived', handleRemoteStreamReceived);
    };
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

  return (
    <div className="relative h-full">
      <VideoContainer
        srcObject={localStream.current}
      />
      {remoteStreams.map((remoteStream, index) => (
        <div key={index} className="absolute bottom-0 left-0 w-40 h-40">
          <VideoContainer srcObject={remoteStream} />
        </div>
      ))}
    </div>
  );
};

export default VideoChat;
