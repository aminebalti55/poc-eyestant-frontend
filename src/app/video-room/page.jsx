'use client';


import VideoRoomClient from '../components/VideoRoomClient';

export default function VideoRoom({ params }) {
  const { roomId } = params;
  return <VideoRoomClient roomId={roomId} />;
}