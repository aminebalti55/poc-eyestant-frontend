'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { MdDashboard, MdPeople, MdDescription, MdCall, MdHelp, MdSettings, MdLogout } from 'react-icons/md';

const Sidebar = ({ isDarkMode }) => {
  const [selected, setSelected] = useState('dashboard');

  const handleSelect = (item) => {
    setSelected(item);
  };

  const menuItems = [
    { id: 'dashboard', icon: MdDashboard, label: 'Tableau de board' },
    { id: 'users', icon: MdPeople, label: 'Mes utilisateurs' },
    { id: 'documents', icon: MdDescription, label: 'Mes documents' },
    { id: 'calls', icon: MdCall, label: 'Mes appels' },
    { id: 'help', icon: MdHelp, label: 'Centre d\'aide' },
    { id: 'settings', icon: MdSettings, label: 'Paramètres' },
    { id: 'logout', icon: MdLogout, label: 'Se déconnecter' }
  ];

  return (
    <div className={`h-screen p-5 w-60 transition-colors duration-500 flex flex-col justify-between ${isDarkMode ? 'bg-dark-sidebar-bg text-dark-sidebar-text' : 'bg-light-sidebar-bg text-light-sidebar-text'}`}>
      <div className="text-center mb-8">
        <Image src={isDarkMode ? "/whitelogo.png" : "/bluelogo.png"} alt="Logo" width={150} height={30} />
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-4">
          {menuItems.slice(0, 4).map(item => (
            <li
              key={item.id}
              onClick={() => handleSelect(item.id)}
              className={`relative flex items-center space-x-3 p-2 rounded-lg cursor-pointer ${selected === item.id ? 'bg-transparent' : ''}`}
            >
              {selected === item.id && <span className={`absolute right-0 top-0 h-full w-1 ${isDarkMode ? 'bg-white' : 'bg-[#422afb]'} rounded-r-lg`}></span>}
              <item.icon size={20} className={`${selected === item.id ? (isDarkMode ? 'text-white' : 'text-[#422afb]') : 'text-gray-400'}`} />
              <span className={`flex-1 ${selected === item.id ? 'font-bold' : 'font-medium'} ${selected === item.id ? (isDarkMode ? 'text-white' : 'text-[#1b254b]') : 'text-gray-400'}`}>
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </nav>
      <div>
        <nav>
          <ul className="space-y-4">
            {menuItems.slice(4).map(item => (
              <li
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`relative flex items-center space-x-3 p-2 rounded-lg cursor-pointer ${selected === item.id ? 'bg-transparent' : ''}`}
              >
                {selected === item.id && <span className={`absolute right-0 top-0 h-full w-1 ${isDarkMode ? 'bg-white' : 'bg-[#422afb]'} rounded-r-lg`}></span>}
                <item.icon size={20} className={`${selected === item.id ? (isDarkMode ? 'text-white' : 'text-[#422afb]') : 'text-gray-400'}`} />
                <span className={`flex-1 ${selected === item.id ? 'font-bold' : 'font-medium'} ${selected === item.id ? (isDarkMode ? 'text-white' : 'text-[#1b254b]') : 'text-gray-400'}`}>
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
