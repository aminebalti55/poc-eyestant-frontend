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
    const peerConnection = new RTCPeerConnection({
      iceServers: [
        {
          urls: 'stun:stun.l.google.com:19302',
        },
      ],
    });

    stream.getTracks().forEach((track) => {
      peerConnection.addTrack(track, stream);
    });

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        sendICECandidateToRemotePeer(event.candidate, roomId);
      }
    };

    peerConnection.ontrack = (event) => {
      console.log('Remote stream received');
      window.dispatchEvent(new CustomEvent('remoteStreamReceived', { detail: { stream: event.streams[0], peerConnection } }));
    };

    if (isInitiator) {
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);
      socket.emit('join-room', roomId);
      sendSignalToRemotePeer(offer, roomId);
    } else {
      const offer = await getRemoteOffer(roomId);
      await peerConnection.setRemoteDescription(offer);
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);
      sendSignalToRemotePeer(answer, roomId);
    }

    return peerConnection;
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

let remoteOffer = null;
const getRemoteOffer = async (roomId) => {
  console.log('Getting remote offer for room:', roomId);
  return new Promise((resolve) => {
    socket.on('signal', ({ senderId, signal }) => {
      if (senderId !== socket.id && signal.type === 'offer') {
        remoteOffer = signal;
        resolve(remoteOffer);
      }
    });
  });
};