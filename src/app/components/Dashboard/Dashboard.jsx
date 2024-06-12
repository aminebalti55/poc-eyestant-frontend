'use client';

import React, { useState } from 'react';
import Sidebar from '@/app/components/Dashboard/Sidebar';
import CardsContainer from '@/app/components/Dashboard/Cards/CardsContainer';
import AppelComponants from '@/app/components/Dashboard/AppelComponants';
import Navbar from '@/app/components/Dashboard/Navbar';
import Statistics from '@/app/components/Dashboard/Charts/Statistics';
import DocumentsPartages from '@/app/components/Dashboard/Charts/DocumentsPartages';
import MonEquipe from '@/app/components/Dashboard/MonEquipe';
import ParametresSecurite from '@/app/components/Dashboard/ParametresSecurite';

const Dashboard = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`flex h-screen transition-colors duration-500 ${isDarkMode ? 'bg-dark-bg' : 'bg-gray-200'}`}>
      <div className={`flex flex-col h-full ${isDarkMode ? 'bg-dark-sidebar-bg' : 'bg-light-sidebar-bg'}`}>
        <Sidebar isDarkMode={isDarkMode} />
      </div>
      <div className={`flex-1 flex flex-col ${isDarkMode ? 'bg-dark-bg' : 'bg-gray-200'}`}>
        <Navbar isDarkMode={isDarkMode} toggleDarkMode={handleToggle} />
        <div className={`flex-1 p-10 mt-20 transition-colors duration-500 ${isDarkMode ? 'bg-dark-bg text-dark-text' : 'bg-gray-200 text-gray-800'}`}>
          <CardsContainer isDarkMode={isDarkMode} />
          <AppelComponants isDarkMode={isDarkMode} />
          <div className="flex space-x-4">
            <Statistics isDarkMode={isDarkMode} />
            <DocumentsPartages isDarkMode={isDarkMode} />
          </div>
          <div className="flex space-x-4 mt-8">
            <MonEquipe isDarkMode={isDarkMode} />
            <ParametresSecurite isDarkMode={isDarkMode} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
