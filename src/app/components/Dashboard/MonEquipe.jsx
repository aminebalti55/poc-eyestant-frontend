'use client';
import React from 'react';
import { FaPlus, FaEllipsisV } from 'react-icons/fa';

const MonEquipe = ({ isDarkMode }) => {
  return (
    <div className={`w-full max-w-xl rounded-2xl shadow-md p-4 mt-8 ${isDarkMode ? 'bg-dark-card-bg text-dark-text' : 'bg-white text-light-text'}`}>
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">Mon équipe</h2>
        <button className={`rounded-full p-2 ${isDarkMode ? 'bg-dark-circle text-white' : 'bg-light-circle text-custom-blue'}`}>
          <FaPlus />
        </button>
      </div>
      <div className="mt-4 space-y-4">
        <div className={`flex items-center justify-between p-2 rounded-lg ${isDarkMode ? 'bg-[#0B1437]' : 'bg-gray-100'}`}>
          <div className="flex items-center space-x-4">
            <img src="/path/to/profile1.jpg" alt="Adela Parkson" className="w-10 h-10 rounded-full" />
            <div>
              <h3 className="font-semibold">Adela Parkson</h3>
              <p className={`text-sm ${isDarkMode ? 'text-dark-subtext' : 'text-gray-500'}`}>Superviseuse</p>
            </div>
          </div>
          <FaEllipsisV className={isDarkMode ? 'text-dark-icon' : 'text-gray-500'} />
        </div>
        <div className={`flex items-center justify-between p-2 rounded-lg ${isDarkMode ? 'bg-[#0B1437]' : 'bg-gray-100'}`}>
          <div className="flex items-center space-x-4">
            <img src="/path/to/profile2.jpg" alt="Christian Mad" className="w-10 h-10 rounded-full" />
            <div>
              <h3 className="font-semibold">Christian Mad</h3>
              <p className={`text-sm ${isDarkMode ? 'text-dark-subtext' : 'text-gray-500'}`}>Conseiller</p>
            </div>
          </div>
          <FaEllipsisV className={isDarkMode ? 'text-dark-icon' : 'text-gray-500'} />
        </div>
        <div className={`flex items-center justify-between p-2 rounded-lg ${isDarkMode ? 'bg-[#0B1437]' : 'bg-gray-100'}`}>
          <div className="flex items-center space-x-4">
            <img src="/path/to/profile3.jpg" alt="Jason Statham" className="w-10 h-10 rounded-full" />
            <div>
              <h3 className="font-semibold">Jason Statham</h3>
              <p className={`text-sm ${isDarkMode ? 'text-dark-subtext' : 'text-gray-500'}`}>Conseiller</p>
            </div>
          </div>
          <FaEllipsisV className={isDarkMode ? 'text-dark-icon' : 'text-gray-500'} />
        </div>
      </div>
    </div>
  );
};

export default MonEquipe;
