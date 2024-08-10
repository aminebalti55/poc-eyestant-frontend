'use client';

import React, { useState } from 'react';
import { FaEye, FaEdit, FaPlus,FaMinus,FaCog, FaDownload } from 'react-icons/fa';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import Modal from '../Atoms/Modal';

const columnHelper = createColumnHelper();

const MesDocuments = ({ isDarkMode, title }) => {
  const [data, setData] = useState([
    { titre: 'Document 1', categorie: 'Catégorie A', date: '2024-08-10', owner: 'John Doe' },
  ]);

  const [sorting, setSorting] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  const handleAdd = (newData) => {
    setData([...data, newData]);
  };

  const columns = [
    columnHelper.accessor('titre', {
      header: () => (
        <p className="text-[10px] font-bold text-gray-600 dark:text-white">Titre</p>
      ),
      cell: (info) => (
        <p className="text-[10px] font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor('categorie', {
      header: () => (
        <p className="text-[10px] font-bold text-gray-600 dark:text-white">Catégorie</p>
      ),
      cell: (info) => (
        <p className="text-[10px] font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor('date', {
      header: () => (
        <p className="text-[10px] font-bold text-gray-600 dark:text-white">Date</p>
      ),
      cell: (info) => (
        <p className="text-[10px] font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor('owner', {
      header: () => (
        <p className="text-[10px] font-bold text-gray-600 dark:text-white">Owner</p>
      ),
      cell: (info) => (
        <p className="text-[10px] font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className={`w-full p-4 rounded-lg ${isDarkMode ? 'bg-dark-card-bg text-dark-text' : 'bg-white text-light-text'} flex-1`}>
      <header className="relative flex items-center justify-between mb-4">
        <div className="text-lg font-bold text-navy-700 dark:text-white">
          {title}
        </div>
        <button 
          className={`rounded-full p-1 ${isDarkMode ? 'bg-dark-circle text-white' : 'bg-light-circle text-custom-blue'}`}
          onClick={() => setIsModalOpen(true)}
        >
          <FaPlus size={12} />
        </button>
      </header>
      <div className="mt-8 max-h-96 overflow-auto">
        <table className="w-full table-fixed">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="!border-px !border-gray-400">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    onClick={header.column.getToggleSortingHandler()}
                    className="cursor-pointer border-b border-gray-200 pb-2 pr-4 pt-4 text-start dark:border-white/30"
                  >
                    <div className="flex items-center justify-between text-[10px] text-gray-600 dark:text-white">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getIsSorted() ? (
                        header.column.getIsSorted() === 'asc' ? ' 🔼' : ' 🔽'
                      ) : null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="border-white/0 py-2 pr-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
                <td className="border-white/0 py-2 pr-4">
                  <div className="flex justify-end space-x-2">
                    <FaEye className="text-gray-500 cursor-pointer" size={12} />
                    <FaCog className="text-gray-500 cursor-pointer" size={12} />
                    <FaDownload className="text-gray-500 cursor-pointer" size={12} />
                    <div className="flex items-center justify-center w-4 h-4 bg-red-600 text-white rounded cursor-pointer" onClick={() => handleDelete(row.index)}>
                      <FaMinus size={8} />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAdd}
      />
    </div>
  );
};

export default MesDocuments;
