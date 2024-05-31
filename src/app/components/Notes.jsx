"use client";

import React from 'react';

const Notes = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold mb-4 text-[#2B3674]">Notes</h2>
      <textarea
        className="w-full h-32 p-2 border border-gray-300 rounded-lg"
        placeholder="Type your notes here..."
      ></textarea>
    </div>
  );
};

export default Notes;
