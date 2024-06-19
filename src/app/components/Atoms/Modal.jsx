'use client';

import React from 'react';
import Button from './Button';
import Input from './Input';

const Modal = ({ isOpen, onClose, onSave, formData, handleChange, isEdit }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white dark:bg-dark-card-bg p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-lg font-bold mb-4 text-navy-700 dark:text-white">
          {isEdit ? 'Edit User' : 'Add New User'}
        </h2>
        <Input label="Nom" name="nom" value={formData.nom} onChange={handleChange} />
        <Input label="Poste" name="poste" value={formData.poste} onChange={handleChange} />
        <Input label="Departement" name="departement" value={formData.departement} onChange={handleChange} />
        <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} />
        <div className="flex justify-end space-x-4">
          <Button onClick={onClose} className="bg-gray-500 text-white">
            Cancel
          </Button>
          <Button onClick={onSave} className="bg-custom-blue text-white">
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
