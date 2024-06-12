"use client";

import React, { useState } from 'react';
import { MdPhone, MdAdd, MdDescription, MdMoreVert, MdContactPhone } from 'react-icons/md';

const AppelComponants = ({ isDarkMode }) => {
  const [documents, setDocuments] = useState([]);
  const [menuOpen, setMenuOpen] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setDocuments([...documents, file.name]);
    }
  };

  const handleDelete = (index) => {
    setDocuments(documents.filter((_, i) => i !== index));
    setMenuOpen(null);
  };

  const toggleMenu = (index) => {
    setMenuOpen(menuOpen === index ? null : index);
  };

  return (
    <div className={`mt-10 p-5 rounded-xl ${isDarkMode ? 'bg-dark-card-bg' : 'bg-light-bg'} w-full`}>
      <div className="flex justify-between items-start">
        <div className="flex flex-col space-y-4 w-1/2">
          <div className="flex items-center bg-gray-100 p-3 rounded-xl">
            <MdContactPhone size={20} className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Numéro de téléphone"
              className="bg-transparent outline-none w-full"
            />
          </div>
          <div className="flex justify-center">
            <button className="bg-[#422afb] text-white py-3 px-6 rounded-xl flex items-center justify-center w-48">
              Lancer l'appel
              <MdPhone size={20} className="ml-2" />
            </button>
          </div>
        </div>
        <div className="w-1/3">
          <div className="flex justify-between items-center mb-4">
            <h3 className={`text-lg ${isDarkMode ? 'text-dark-text' : 'text-light-text'}`}>Documents</h3>
            <label className="bg-[#422afb] text-white p-2 rounded-full cursor-pointer">
              <MdAdd size={20} />
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
          <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-dark-circle' : 'bg-light-circle'}`}>
            <ul className="space-y-2">
              {documents.map((doc, index) => (
                <li key={index} className="relative flex items-center justify-between p-2 bg-gray-100 rounded-lg">
                  <MdDescription size={20} className="text-gray-400" />
                  <span className="flex-1 ml-2 truncate">{doc}</span>
                  <button className="text-gray-400" onClick={() => toggleMenu(index)}>
                    <MdMoreVert size={20} />
                  </button>
                  {menuOpen === index && (
                    <div className="absolute right-0 mt-8 bg-white shadow-lg rounded p-2 z-10">
                      <button
                        className="text-red-600 text-sm"
                        onClick={() => handleDelete(index)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppelComponants;
