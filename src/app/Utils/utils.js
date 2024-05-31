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
      window.dispatchEvent(new CustomEvent('remoteStreamReceived', { detail: { stream: event.streams[0] } }));
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

    socket.on('signal', async ({ senderId, signal }) => {
      if (signal.type === 'offer' && !isInitiator) {
        await peerConnection.setRemoteDescription(new RTCSessionDescription(signal));
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        sendSignalToRemotePeer(answer, roomId);
      } else if (signal.type === 'answer' && isInitiator) {
        await peerConnection.setRemoteDescription(new RTCSessionDescription(signal));
      } else if (signal.candidate) {
        try {
          await peerConnection.addIceCandidate(new RTCIceCandidate(signal.candidate));
        } catch (error) {
          console.error('Error adding received ice candidate', error);
        }
      }
    });

    return peerConnection;
  } catch (error) {
    console.error('Error connecting peers:', error);
  }
};

const sendSignalToRemotePeer = (signal, roomId) => {
  socket.emit('signal', { roomId, signal });
};

const sendICECandidateToRemotePeer = (candidate, roomId) => {
  socket.emit('ice-candidate', { roomId, candidate });
};

const getRemoteOffer = async (roomId) => {
  return new Promise((resolve) => {
    socket.once('signal', ({ signal }) => {
      if (signal.type === 'offer') {
        resolve(signal);
      }
    });
  });
};
