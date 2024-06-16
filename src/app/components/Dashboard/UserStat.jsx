'use client';

import React from 'react';
import { FaHeadset } from 'react-icons/fa';

const StatistiqueCard = ({ appels, isDarkMode }) => (
  <div className={`flex items-center rounded-md p-4 w-full h-24 ${isDarkMode ? 'bg-[#0B1437]' : 'bg-gray-100'}`}>
    <div className={`flex items-center justify-center w-12 h-12 rounded-full mr-4 ${isDarkMode ? 'bg-dark-circle' : 'bg-white'}`}>
      <FaHeadset className={`text-${isDarkMode ? 'dark-icon' : 'light-icon'}`} size={24} />
    </div>
    <div>
      <p className={`text-sm font-bold ${isDarkMode ? 'text-dark-subtext' : 'text-gray-600'}`}>Appels</p>
      <p className={`text-lg font-bold ${isDarkMode ? 'text-dark-text' : 'text-gray-900'}`}>{appels}</p>
    </div>
  </div>
);

const StatistiquesContainer = ({ title, statistiques, isDarkMode }) => (
  <div className={`p-4 rounded-lg flex-1 m-2 shadow-sm w-full max-w-2xl ${isDarkMode ? 'bg-[#111C44]' : 'bg-light-bg'}`}>
    <h2 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-dark-text' : 'text-navy-700'}`}>{title}</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {statistiques.map((stat, index) => (
        <StatistiqueCard key={index} appels={stat.appels} isDarkMode={isDarkMode} />
      ))}
    </div>
  </div>
);

const UserStat = ({ isDarkMode }) => {
  const statistiques = [
    { appels: 8564 },
    { appels: 8564 },
    { appels: 8564 },
    { appels: 8564 },
  ];

  return (
    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-8 justify-center">
      <StatistiquesContainer title="Statistiques du superviseur" statistiques={statistiques} isDarkMode={isDarkMode} />
      <StatistiquesContainer title="Statistiques de l'utilisateur" statistiques={statistiques} isDarkMode={isDarkMode} />
    </div>
  );
};

export default UserStat;
