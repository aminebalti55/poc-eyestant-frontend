import React from 'react';

const VideoContainer = ({ srcObject, isMain, onMouseEnter, onMouseLeave, children }) => (
  <div
    className={`relative bg-gray-200 rounded-lg overflow-hidden shadow-lg ${isMain ? 'h-full' : 'aspect-video'}`}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    <video
      ref={(videoEl) => {
        if (videoEl && srcObject) {
          videoEl.srcObject = srcObject;
        }
      }}
      autoPlay
      className="w-full h-full object-cover"
    />
    {children}
  </div>
);

export default VideoContainer;
