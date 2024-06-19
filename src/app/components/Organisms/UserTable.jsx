'use client';

import React, { useState } from 'react';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import IconButton from '../Atoms/IconButton';
import Modal from '../Atoms/Modal';
import TableRowActions from '../Molecules/TableRowActions';
import { useCrud } from '../../hooks/useCrud';

const columnHelper = createColumnHelper();

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

  const columns = [
    columnHelper.accessor('nom', {
      header: () => <span className="text-xs">NOM</span>,
      cell: info => <span className="text-xs">{info.getValue()}</span>,
    }),
    columnHelper.accessor('poste', {
      header: () => <span className="text-xs">POSTE</span>,
      cell: info => <span className="text-xs">{info.getValue()}</span>,
    }),
    columnHelper.accessor('departement', {
      header: () => <span className="text-xs">DEPARTEMENT</span>,
      cell: info => <span className="text-xs">{info.getValue()}</span>,
    }),
    columnHelper.accessor('email', {
      header: () => <span className="text-xs">E-MAIL</span>,
      cell: info => <span className="text-xs">{info.getValue()}</span>,
    }),
  ];

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

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

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
      <div className="overflow-x-auto">
        <table className="w-full table-fixed">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id} className="!border-px !border-gray-400">
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="cursor-pointer border-b border-gray-200 pb-2 pr-4 pt-4 text-start dark:border-white/30"
                  >
                    <div className="flex items-center justify-between text-xs text-gray-600 dark:text-white">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </div>
                  </th>
                ))}
                <th className="border-b border-gray-200 pb-2 pr-4 pt-4 text-start dark:border-white/30">
                  <div className="flex items-center justify-between text-xs text-gray-600 dark:text-white">
                    ACTIONS
                  </div>
                </th>
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="border-white/0 py-2 pr-4 text-xs">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
                <td className="border-white/0 py-2 pr-4 text-xs">
                  <TableRowActions onEdit={() => handleEditClick(row.index)} onDelete={() => handleDelete(row.index)} index={row.index} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
