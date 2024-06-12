"use client";


import React from 'react';
import Card from './Card'; // Adjust the import path accordingly
import { MdCall, MdBarChart, MdDescription } from 'react-icons/md';
import { FaBullseye } from 'react-icons/fa';

const CardsContainer = ({ isDarkMode }) => {
  return (
    <div className="flex justify-start space-x-2 overflow-x-auto">
      <Card icon={<MdCall size={12} className={`${isDarkMode ? 'text-dark-icon' : 'text-light-icon'}`} />} title="Appels" info="8564" isDarkMode={isDarkMode} />
      <Card icon={<MdBarChart size={12} className={`${isDarkMode ? 'text-dark-icon' : 'text-light-icon'}`} />} title="Appels / Utilisateur" info="785" isDarkMode={isDarkMode} />
      <Card icon={<MdCall size={12} className={`${isDarkMode ? 'text-dark-icon' : 'text-light-icon'}`} />} title="Durée moyenne des appels" info="40 sec" additionalInfo="+23% depuis la dernière campagne" isDarkMode={isDarkMode} />
      <Card icon={<MdDescription size={12} className={`${isDarkMode ? 'text-dark-icon' : 'text-light-icon'}`} />} title="Documents partagés" info="460" isDarkMode={isDarkMode} />
      <Card icon={<MdBarChart size={12} className={`${isDarkMode ? 'text-dark-icon' : 'text-light-icon'}`} />} title="Documents / Utilisateur" info="20" isDarkMode={isDarkMode} />
      <Card icon={<FaBullseye size={12} className={`${isDarkMode ? 'text-dark-icon' : 'text-light-icon'}`} />} title="Objectifs (Document / Campagne)" info="10,000" additionalInfo="+23% depuis la dernière campagne" isDarkMode={isDarkMode} />
    </div>
  );
};

export default CardsContainer;
