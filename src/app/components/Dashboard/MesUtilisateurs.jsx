'use client';

import React, { useState } from 'react';
import { FaEye, FaKey, FaPlus, FaMinus } from 'react-icons/fa';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

const columnHelper = createColumnHelper();

const MesUtilisateurs = ({ isDarkMode, title }) => {
  const [data, setData] = useState([
    { nom: 'NOM', poste: 'Agent X', departement: 'Département X', email: 'NOM@COMPANY.COM' },
    // Add more data as needed
  ]);

  const [sorting, setSorting] = useState([]);

  const handleDelete = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

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
    columnHelper.display({
      id: 'actions',
      header: () => <span></span>,
      cell: (info) => (
        <div className="flex justify-end space-x-2 pr-8">
          
        </div>
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
        <button className={`rounded-full p-1 ${isDarkMode ? 'bg-dark-circle text-white' : 'bg-light-circle text-custom-blue'}`}>
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
                    <FaKey className="text-gray-500 cursor-pointer" size={12} />
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
    </div>
  );
};

export default MesUtilisateurs;
