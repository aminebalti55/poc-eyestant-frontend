'use client';

import React, { useState } from 'react';
import Sidebar from '@/app/components/Dashboard/Sidebar';
import Navbar from '@/app/components/Dashboard/Navbar';
import CardsContainer from '@/app/components/Dashboard/Cards/CardsContainer';
import AppelComponants from '@/app/components/Dashboard/AppelComponants';
import Statistics from '@/app/components/Dashboard/Charts/Statistics';
import DocumentsPartages from '@/app/components/Dashboard/Charts/DocumentsPartages';
import MonEquipe from '@/app/components/Dashboard/MonEquipe';
import ParametresSecurite from '@/app/components/Dashboard/ParametresSecurite';
import UserTable from '@/app/components/Organisms/UserTable';
import UserStat from '@/app/components/Dashboard/UserStat';
import MesAppels from '@/app/components/Dashboard/MesAppels';
import Log from '@/app/components/Dashboard/Log';
import DocumentPartages from '@/app/components/Dashboard/DocumentPartages';

const Dashboard = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedTab, setSelectedTab] = useState('dashboard');

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  const renderContent = () => {
    switch (selectedTab) {
      case 'dashboard':
        return (
          <>
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
          </>
        );
      case 'users':
        return (
          <div className="flex flex-col space-y-8">
            <div className="flex space-x-4">
              <UserTable isDarkMode={isDarkMode} title="Superviseurs" hasActions />
              <UserTable isDarkMode={isDarkMode} title="Utilisateurs" hasActions />
            </div>
            <UserStat isDarkMode={isDarkMode} />
          </div>
        );
      case 'documents':
        return <div>Mes documents content</div>;
      case 'calls':
        return (
          <>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <MesAppels />
              <Log />
            </div>
            <DocumentPartages />
          </>
        );
      case 'help':
        return <div>Centre d'aide content</div>;
      case 'settings':
        return <div>Paramètres content</div>;
      case 'logout':
        return <div>Se déconnecter content</div>;
      default:
        return null;
    }
  };

  return (
    <div className={`flex h-screen transition-colors duration-500 ${isDarkMode ? 'bg-dark-bg' : 'bg-gray-200'}`}>
      <div className={`flex flex-col h-full ${isDarkMode ? 'bg-dark-sidebar-bg' : 'bg-light-sidebar-bg'}`}>
        <Sidebar isDarkMode={isDarkMode} setSelectedTab={setSelectedTab} />
      </div>
      <div className={`flex-1 flex flex-col ${isDarkMode ? 'bg-dark-bg' : 'bg-gray-200'}`}>
        <Navbar isDarkMode={isDarkMode} toggleDarkMode={handleToggle} />
        <div className={`flex-1 p-10 mt-20 transition-colors duration-500 ${isDarkMode ? 'bg-dark-bg text-dark-text' : 'bg-gray-200 text-gray-800'}`}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
