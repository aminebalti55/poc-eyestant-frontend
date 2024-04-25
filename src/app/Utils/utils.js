import Peer from 'simple-peer';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');



export const generateRoomId = () => {
  const roomIdLength = 8; 
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let roomId = '';

  for (let i = 0; i < roomIdLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    roomId += characters.charAt(randomIndex);
  }

  return roomId;
};

export const connectPeers = async (roomId, isInitiator, stream) => {
  try {
    const peer = new Peer({
      initiator: isInitiator,
      trickle: false,
      config: {
        iceServers: [
          {
            urls: 'stun:stun.l.google.com:19302',
          },

        ],
      },
    });

    peer.addStream(stream);

    peer.on('stream', (remoteStream) => {
      const remoteVideo = document.getElementById('remote-video');

      console.log(remoteVideo)
      remoteVideo.srcObject = remoteStream;
    });

    peer.on('signal', (signal) => {
      sendSignalToRemotePeer(signal, roomId);
    });

    peer.on('icecandidate', (candidate) => {
      sendICECandidateToRemotePeer(candidate, roomId);
    });

    if (isInitiator) {

      socket.emit('join-room', roomId);

      socket.on('signal', ({ senderId, signal }) => {
        if (senderId !== socket.id) {
          peer.signal(signal);
        }
      });

      socket.on('ice-candidate', ({ senderId, candidate }) => {
        if (senderId !== socket.id) {
          peer.addIceCandidate(new RTCIceCandidate(candidate));
        }
      });
    } else {

      const remoteSignal = await getRemoteSignal(roomId);
      peer.signal(remoteSignal);
    }

    return peer;
  } catch (error) {
    console.error('Error connecting peers:', error);
  }
};

const sendSignalToRemotePeer = (signal, roomId) => {
  console.log('Sending signal to remote peer:', signal, 'for room:', roomId);
  socket.emit('signal', { roomId, signal });
};

const sendICECandidateToRemotePeer = (candidate, roomId) => {
  console.log('Sending ICE candidate to remote peer:', candidate, 'for room:', roomId);
  socket.emit('ice-candidate', { roomId, candidate });
};

let remoteSignal = null;
const getRemoteSignal = async (roomId) => {
  console.log('Getting remote signal for room:', roomId);
  return new Promise((resolve) => {
    socket.on('signal', ({ senderId, signal }) => {
      if (senderId !== socket.id) {
        remoteSignal = signal;
        resolve(remoteSignal);
      }
    });
  });
};

export const handleICECandidateEvent = (event, peer) => {
  if (event.candidate) {
    peer.signal({ candidate: event.candidate });
  }
};