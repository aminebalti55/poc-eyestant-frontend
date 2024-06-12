"use client";

import React, { useState, useEffect } from 'react';
import { MdSearch, MdNotifications, MdHelp, MdNightlight } from 'react-icons/md';

const Navbar = ({ isDarkMode, toggleDarkMode }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    setIsScrolled(scrollTop > 0);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`fixed top-0 right-0 z-50 w-[calc(100%-15rem)] p-5 transition-colors duration-500 ${isScrolled ? 'bg-opacity-40 backdrop-blur-md' : (isDarkMode ? 'bg-dark-bg' : 'bg-light-bg')}`}>
      <div className="flex justify-between items-center">
        <div className={`text-lg font-bold ${isDarkMode ? 'text-dark-text' : 'text-light-text'}`}>
          Welcome to the Dashboard
        </div>
        <div className={`relative flex items-center space-x-2 p-1.5 rounded-full shadow-lg ${isDarkMode ? 'bg-dark-sidebar-bg' : 'bg-white'}`}>
          <div className="relative">
            <MdSearch className={`absolute left-2 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} size={18} />
            <input
              type="text"
              placeholder="Search..."
              className={`rounded-full pl-8 pr-3 py-1 text-sm outline-none ${isDarkMode ? 'bg-dark-card-bg text-dark-text' : 'bg-gray-100 text-light-text'}`}
            />
          </div>
          <MdNotifications size={20} className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
          <MdHelp size={20} className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
          <button onClick={toggleDarkMode}>
            <MdNightlight size={20} className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
          </button>
          <div className="relative">
            <img
              src="https://i.pinimg.com/originals/42/6c/8c/426c8cf7e271ada32c2615949d70c990.jpg"
              alt="Profile"
              className="w-8 h-8 rounded-full cursor-pointer"
              onClick={toggleDropdown}
            />
            {dropdownOpen && (
              <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg py-2 ${isDarkMode ? 'bg-dark-sidebar-bg text-dark-text' : 'bg-white text-light-text'}`}>
                <div className="px-4 py-2 border-b border-gray-200">
                  <span role="img" aria-label="waving hand">👋</span> Hey, Amine
                </div>
                <a href="#" className={`block px-4 py-2 hover:${isDarkMode ? 'bg-dark-circle' : 'bg-gray-100'}`}>Profile Settings</a>
                <a href="#" className={`block px-4 py-2 hover:${isDarkMode ? 'bg-dark-circle' : 'bg-gray-100'}`}>Newsletter Settings</a>
                <a href="#" className={`block px-4 py-2 text-red-600 hover:${isDarkMode ? 'bg-dark-circle' : 'bg-gray-100'}`}>Log Out</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
