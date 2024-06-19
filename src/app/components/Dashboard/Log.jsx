'use client';

import React from 'react';

const logs = [
  "[11:04] Message envoyé !",
  "[11:04] Adam – conseiller est prêt pour l'appel et en attente du deuxième partie !",
  "[11:04] Jasmine a rejoint l'appel !",
  "[11:05] Adam – conseiller a partagé un document !",
  "[11:05] L'appel est en pause !",
  "[11:05] L'appel est en cours !",
  "[11:05] Jasmine a quitté l'appel !",
  "[11:05] Appel terminé !"
];

const Log = () => {
  return (
    <div className="p-2 bg-white rounded-lg shadow-md w-1/2">
      <h2 className="text-md font-bold mb-2 text-navy-700">LOG</h2>
      <div className="text-sm text-gray-700">
        {logs.map((log, index) => (
          <div key={index} className="mb-1">{log}</div>
        ))}
      </div>
    </div>
  );
};

export default Log;
