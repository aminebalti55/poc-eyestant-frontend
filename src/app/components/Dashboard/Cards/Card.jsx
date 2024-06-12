"use client";

import React from 'react';

const Card = ({ icon, title, info, additionalInfo, isDarkMode }) => {
  return (
    <div className={`flex items-center rounded-xl p-2 space-x-2 w-40 h-16 ${isDarkMode ? 'bg-dark-card-bg text-dark-text' : 'bg-light-bg text-light-text'}`}>
      <div className={`p-1.5 rounded-full ${isDarkMode ? 'bg-dark-circle' : 'bg-light-circle'}`}>
        {icon}
      </div>
      <div className="overflow-hidden">
        <h2 className={`text-xs truncate ${isDarkMode ? 'text-dark-text' : 'text-light-text'}`}>{title}</h2>
        <p className={`text-sm font-bold truncate ${isDarkMode ? 'text-dark-text' : 'text-light-text'}`}>{info}</p>
        {additionalInfo && <p className={`text-xs truncate ${isDarkMode ? 'text-dark-subtext' : 'text-green-500'}`}>{additionalInfo}</p>}
      </div>
    </div>
  );
};

export default Card;
