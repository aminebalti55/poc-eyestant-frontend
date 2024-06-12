'use client';
import React from 'react';
import { FaFingerprint } from 'react-icons/fa';

const ParametresSecurite = ({ isDarkMode }) => {
  return (
    <div className={`w-full max-w-xl rounded-2xl shadow-md p-4 mt-8 flex flex-col justify-between ${isDarkMode ? 'bg-dark-card-bg text-dark-text' : 'bg-white text-light-text'}`}>
      <div className="flex justify-center items-center">
        <FaFingerprint className={`text-6xl ${isDarkMode ? 'text-dark-icon' : 'text-custom-blue'}`} />
      </div>
      <div className="mt-4 flex flex-col items-center flex-1">
        <h2 className="text-lg font-bold">Paramètres Sécurité</h2>
        <p className={`text-sm mt-2 text-center ${isDarkMode ? 'text-dark-subtext' : 'text-gray-500'}`}>Vous pouvez changer vos paramètres de Sécurité par ici.</p>
        <button className="mt-auto bg-custom-blue text-white px-4 py-2 rounded-full w-full">Paramètres</button>
      </div>
    </div>
  );
};

export default ParametresSecurite;
