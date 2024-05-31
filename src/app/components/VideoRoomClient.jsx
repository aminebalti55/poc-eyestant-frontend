"use client";

import React, { useState, useCallback, useRef, useEffect } from 'react';
import VideoChat from '@/app/components/VideoChat';
import { generateRoomId, connectPeers } from '../Utils/utils';
import { FaVideo } from 'react-icons/fa';
import { BsMicMuteFill, BsMicMute, BsCameraVideo, BsCameraVideoOff, BsTelephoneXFill } from "react-icons/bs";
import { LuScreenShare, LuScreenShareOff } from "react-icons/lu";
import DeviceSelection from './DeviceSelection';
import Chat from './Chat';
import Notes from './Notes';
import Documents from './Documents';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Button from '@/app/Design/Button';

export default function VideoRoomClient({ roomId: initialRoomId }) {
  const searchParams = useSearchParams();
  const urlRoomId = searchParams.get('roomId');
  const [roomId, setRoomId] = useState(urlRoomId || initialRoomId || '');
  const [peer, setPeer] = useState(null);
  const [roomLink, setRoomLink] = useState('');
  const [isRoomJoined, setIsRoomJoined] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [showDeviceSelection, setShowDeviceSelection] = useState(false);
  const screenSharingStream = useRef(null);
  const localStream = useRef(null);
  const localVideoRef = useRef(null);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);

  const toggleScreenShare = useCallback(async () => {
    try {
      if (!isScreenSharing) {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        screenSharingStream.current = screenStream;
        setIsScreenSharing(true);
      } else {
        screenSharingStream.current.getTracks().forEach((track) => track.stop());
        screenSharingStream.current = null;
        setIsScreenSharing(false);
      }
    } catch (error) {
      console.error('Error sharing screen:', error);
    }
  }, [isScreenSharing]);

  useEffect(() => {
    if (localStream.current && localVideoRef.current) {
      if (isScreenSharing && screenSharingStream.current) {
        localVideoRef.current.srcObject = screenSharingStream.current;
      } else {
        localVideoRef.current.srcObject = localStream.current;
      }
    }
  }, [isScreenSharing, localStream, screenSharingStream, localVideoRef]);

  const createNewRoom = useCallback(() => {
    const newRoomId = generateRoomId();
    setRoomId(newRoomId);
    const newRoomLink = `${window.location.origin}/video-room?roomId=${newRoomId}`;
    setRoomLink(newRoomLink);
  }, []);

  const joinRoomWithDevices = useCallback(
    async (selectedMicrophone, selectedCamera) => {
      try {
        const constraints = {
          audio: { deviceId: selectedMicrophone ? { exact: selectedMicrophone } : undefined },
          video: { deviceId: selectedCamera ? { exact: selectedCamera } : undefined },
        };
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        localStream.current = stream;
        const peerConnection = await connectPeers(roomId, !initialRoomId, stream);
        setPeer(peerConnection);
        setIsRoomJoined(true);
        setShowDeviceSelection(false);
      } catch (error) {
        console.error('Error initializing WebRTC:', error);
      }
    },
    [roomId, initialRoomId]
  );

  const leaveRoom = useCallback(() => {
    if (peer) {
      peer.close();
      setPeer(null);
    }
    if (localStream.current) {
      localStream.current.getTracks().forEach((track) => track.stop());
      localStream.current = null;
    }
    if (screenSharingStream.current) {
      screenSharingStream.current.getTracks().forEach((track) => track.stop());
      screenSharingStream.current = null;
    }
    setIsRoomJoined(false);
  }, [peer]);

  const sendMessage = (messageText) => {
    if (messageText.trim()) {
      const message = {
        text: messageText,
        username: 'User', // Replace 'User' with the actual username variable
        time: new Date().toISOString(),
      };
      setChatMessages((prevMessages) => [...prevMessages, message]);
    }
  };

  useEffect(() => {
    if (urlRoomId && !isRoomJoined) {
      joinRoomWithDevices(null, null);
    }
  }, [urlRoomId, isRoomJoined, joinRoomWithDevices]);

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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <div className="p-4">
        <Image src="/bluelogo.png" alt="Logo" width={200} height={50} />
      </div>
      <div className="flex flex-grow justify-center items-center w-full">
        {roomId ? (
          <div className="flex flex-row h-full w-full space-x-4 p-4">
            <div className="flex flex-col w-2/3 h-full">
              {isRoomJoined && (
                <VideoChat
                  roomId={roomId}
                  peer={peer}
                  localStream={localStream}
                  localVideoRef={localVideoRef}
                  leaveRoom={leaveRoom}
                  isScreenSharing={isScreenSharing}
                  toggleScreenShare={toggleScreenShare}
                  screenSharingStream={screenSharingStream}
                />
              )}
            </div>
            <div className="flex flex-col w-1/3 space-y-4">
              <Chat chatMessages={chatMessages} sendMessage={sendMessage} username={'User'} />
              <Documents />
              <Notes />
              {isRoomJoined && (
                <div className="flex space-x-2 justify-between">
                  <Button onClick={toggleMic} className="w-1/4 bg-[#4318FF] hover:bg-[#4318FF]">
                    {isMicOn ? <BsMicMuteFill size={24} /> : <BsMicMute size={24} />}
                  </Button>
                  <Button onClick={toggleCamera} className="w-1/4 bg-[#4318FF] hover:bg-[#4318FF]">
                    {isCameraOn ? <BsCameraVideo size={24} /> : <BsCameraVideoOff size={24} />}
                  </Button>
                  <Button onClick={toggleScreenShare} className="w-1/4 bg-[#4318FF] hover:bg-[#4318FF]">
                    {isScreenSharing ? <LuScreenShareOff size={24} /> : <LuScreenShare size={24} />}
                  </Button>
                  <Button onClick={leaveRoom} className="w-1/4 bg-red-500 hover:bg-red-600">
                    <BsTelephoneXFill size={24} />
                  </Button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full w-full">
            <h1 className="text-4xl font-bold mb-4">Welcome to Eyestant</h1>
            <p className="text-gray-600 mb-8 text-center">Click the button below to create a new room</p>
            <button
              onClick={() => {
                createNewRoom();
                setShowDeviceSelection(true);
              }}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 flex items-center"
            >
              <FaVideo className="mr-2" /> Create New Room
            </button>
          </div>
        )}

        {showDeviceSelection && !isRoomJoined && (
          <DeviceSelection onJoinRoom={joinRoomWithDevices} onClose={() => setShowDeviceSelection(false)} />
        )}
      </div>
    </div>
  );
}
