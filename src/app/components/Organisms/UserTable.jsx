'use client';

import React, { useState } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import IconButton from '../Atoms/IconButton';
import Modal from '../Atoms/Modal';
import Table from './Table';
import { useCrud } from '../../hooks/useCrud';

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor('nom', {
    header: () => (
      <p className="text-[10px] font-bold text-gray-600 dark:text-white">NOM</p>
    ),
    cell: (info) => (
      <p className="text-[10px] font-bold text-navy-700 dark:text-white">
        {info.getValue()}
      </p>
    ),
  }),
  columnHelper.accessor('poste', {
    header: () => (
      <p className="text-[10px] font-bold text-gray-600 dark:text-white">POSTE</p>
    ),
    cell: (info) => (
      <p className="text-[10px] font-bold text-navy-700 dark:text-white">
        {info.getValue()}
      </p>
    ),
  }),
  columnHelper.accessor('departement', {
    header: () => (
      <p className="text-[10px] font-bold text-gray-600 dark:text-white">DEPARTEMENT</p>
    ),
    cell: (info) => (
      <p className="text-[10px] font-bold text-navy-700 dark:text-white">
        {info.getValue()}
      </p>
    ),
  }),
  columnHelper.accessor('email', {
    header: () => (
      <p className="text-[10px] font-bold text-gray-600 dark:text-white">E-MAIL</p>
    ),
    cell: (info) => (
      <p className="text-[10px] font-bold text-navy-700 dark:text-white">
        {info.getValue()}
      </p>
    ),
  }),
];

const UserTable = ({ isDarkMode, title }) => {
  const { data, handleAdd, handleEdit, handleDelete } = useCrud([
    { nom: 'NOM', poste: 'Agent X', departement: 'Département X', email: 'NOM@COMPANY.COM' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    poste: '',
    departement: '',
    email: '',
  });
  const [currentIndex, setCurrentIndex] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    if (isEdit) {
      handleEdit(currentIndex, formData);
    } else {
      handleAdd(formData);
    }
    setFormData({ nom: '', poste: '', departement: '', email: '' });
    setIsModalOpen(false);
  };

  const handleEditClick = (index) => {
    setCurrentIndex(index);
    setFormData(data[index]);
    setIsEdit(true);
    setIsModalOpen(true);
  };

  const handleAddClick = () => {
    setIsEdit(false);
    setFormData({ nom: '', poste: '', departement: '', email: '' });
    setIsModalOpen(true);
  };

  return (
    <div className={`w-full p-4 rounded-lg ${isDarkMode ? 'bg-dark-card-bg text-dark-text' : 'bg-white text-light-text'} flex-1`}>
      <header className="relative flex items-center justify-between mb-4">
        <div className="text-lg font-bold text-navy-700 dark:text-white">
          {title}
        </div>
        <IconButton 
          icon="plus"
          className={isDarkMode ? 'bg-dark-circle text-white' : 'bg-light-circle text-custom-blue'}
          onClick={handleAddClick}
        />
      </header>
      <Table data={data} columns={columns} onEdit={handleEditClick} onDelete={handleDelete} />
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        formData={formData}
        handleChange={handleChange}
        isEdit={isEdit}
      />
    </div>
  );
};

export default UserTable;
