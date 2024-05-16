'use client';
import { useState, useCallback, useRef, useEffect } from 'react';
import VideoChat from '@/app/components/VideoChat';
import { generateRoomId, connectPeers, handleICECandidateEvent } from '../Utils/utils';
import { FaVideo } from 'react-icons/fa';
import DeviceSelection from './DeviceSelection';
import Chat from './Chat';
import RoomLinkSection from './RoomLinkSection';
import { useSearchParams } from 'next/navigation';

export default function VideoRoomClient({ roomId: initialRoomId }) {
  const searchParams = useSearchParams();
  const urlRoomId = searchParams.get('roomId');
  const [roomId, setRoomId] = useState(urlRoomId || initialRoomId || '');
  
    const [peer, setPeer] = useState(null);
  const [roomLink, setRoomLink] = useState('');
  const remoteVideoRef = useRef(null);
  const localStream = useRef(null);
  const [isRoomJoined, setIsRoomJoined] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [showDeviceSelection, setShowDeviceSelection] = useState(false);
  const screenSharingStream = useRef(null);
  const localVideoRef = useRef(null);

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
        console.log('Media constraints:', constraints);
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        console.log('Local stream obtained:', stream);
        localStream.current = stream;
        const peerConnection = await connectPeers(roomId, true, stream);
        console.log('New peer connection established:', peerConnection);
        setPeer(peerConnection);
        setIsRoomJoined(true);
        console.log('Room joined successfully.');
        setShowDeviceSelection(false);
        console.log('Device selection UI hidden.');
      } catch (error) {
        console.error('Error initializing WebRTC:', error);
      }
    },
    [roomId]
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

  const sendMessage = (message) => {
    if (message.trim()) {
      setChatMessages((prevMessages) => [...prevMessages, message.trim()]);
    }
  };

  useEffect(() => {
    if (urlRoomId && !isRoomJoined) {
      joinRoomWithDevices(null, null);
    }
  }, [urlRoomId, isRoomJoined, joinRoomWithDevices]);


  return (
<div className="min-h-screen bg-gradient-to-r from-indigo-900 via-blue-900 to-indigo-800 flex justify-center items-center">
        <div className="max-w-5xl w-full bg-white rounded-lg shadow-lg p-4 md:p-8" style={{ maxWidth: '80vw', height: '77vh' }}>
        {roomId ? (
          <div className="flex flex-col md:flex-row h-full">
            <div className="md:w-2/3 md:h-full md:pr-4">
              {isRoomJoined && (
                <div className="w-full h-full">
                  <VideoChat
                    roomId={roomId}
                    peer={peer}
                    id={"remote-video"}
                    remoteVideoRef={remoteVideoRef}
                    localStream={localStream}
                    localVideoRef={localVideoRef}
                    leaveRoom={leaveRoom}
                    isScreenSharing={isScreenSharing}
                    toggleScreenShare={toggleScreenShare}
                    screenSharingStream={screenSharingStream}
                  />
                </div>
              )}
            </div>
            <div className="md:w-1/3 md:h-full md:border-l md:border-gray-300 md:pl-8">
              <RoomLinkSection roomLink={roomLink} />
              {isRoomJoined && <Chat chatMessages={chatMessages} sendMessage={sendMessage} />}
              {!isRoomJoined && (
                <button
                  onClick={() => {
                    createNewRoom();
                    setShowDeviceSelection(true);
                  }}
                  className="w-full mb-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 flex items-center justify-center"
                >
                  <FaVideo className="mr-2" /> Create New Room
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
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
      </div>

      {showDeviceSelection && !isRoomJoined && (
        <DeviceSelection onJoinRoom={joinRoomWithDevices} onClose={() => setShowDeviceSelection(false)} />
      )}
    </div>
  );
}