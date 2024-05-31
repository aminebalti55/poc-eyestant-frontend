"use client";

import React, { useEffect, useRef } from 'react';

const VideoContainer = ({ srcObject, isMain, onMouseEnter, onMouseLeave, children }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && srcObject) {
      videoRef.current.srcObject = srcObject;
    }
  }, [srcObject]);

  return (
    <div
      className={`relative bg-gray-200 rounded-lg overflow-hidden shadow-lg ${isMain ? 'h-full' : 'aspect-video'}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-full h-full object-cover"
      />
      {children}
    </div>
  );
};

export default VideoContainer;
