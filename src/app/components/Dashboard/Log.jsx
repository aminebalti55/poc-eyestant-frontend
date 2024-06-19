'use client';

import React from 'react';

const Log = ({ isDarkMode }) => {
  return (
    <div className={`p-2 ${isDarkMode ? 'bg-dark-card-bg text-dark-text' : 'bg-light-bg text-light-text'} rounded-lg shadow-md w-full md:w-1/2`}>
      <h2 className="text-md font-bold mb-2 text-navy-700 dark:text-white">LOG</h2>
      <div className="space-y-2">
        <p className="text-sm">[11:04] Message envoyé !</p>
        <p className="text-sm">[11:04] Adam - conseiller est prêt pour l'appel et en attente du deuxième partie !</p>
        <p className="text-sm">[11:04] Jasmine a rejoint l'appel !</p>
        <p className="text-sm">[11:05] Adam - conseiller a partagé un document !</p>
        <p className="text-sm">[11:05] L'appel est en pause !</p>
        <p className="text-sm">[11:05] L'appel est en cours !</p>
        <p className="text-sm">[11:05] Jasmine a quitté l'appel !</p>
        <p className="text-sm">[11:05] Appel terminé !</p>
      </div>
    </div>
  );
};

export default Log;
