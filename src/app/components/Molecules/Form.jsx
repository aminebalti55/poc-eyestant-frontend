'use client';

import React from 'react';
import Input from '../Atoms/Input';
import Button from '../Atoms/Button';

const Form = ({ formData, handleChange, onSave, onClose }) => (
  <>
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
  </>
);

export default Form;
