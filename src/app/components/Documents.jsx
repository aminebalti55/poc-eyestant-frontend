"use client";

import React from 'react';
import { FaFileAlt } from 'react-icons/fa';

const Documents = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold mb-4 text-[#2B3674]">Documents</h2>
      <ul className="space-y-2">
        <li className="flex items-center">
          <FaFileAlt className="mr-2" /> Document X
        </li>
        <li className="flex items-center">
          <FaFileAlt className="mr-2" /> Document Y
        </li>
        <li className="flex items-center">
          <FaFileAlt className="mr-2" /> Document Z
        </li>
      </ul>
    </div>
  );
};

export default Documents;
