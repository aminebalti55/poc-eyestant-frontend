'use client';

import React from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { FaPhoneAlt, FaPhone } from 'react-icons/fa';
import Input from '../Atoms/Input';
import Button from '../Atoms/Button';

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor('nom', {
    header: () => <span className="text-xs">NOM</span>,
    cell: info => <span className="text-xs">{info.getValue()}</span>,
  }),
  columnHelper.accessor('duree', {
    header: () => <span className="text-xs">DUREE</span>,
    cell: info => <span className="text-xs">{info.getValue()}</span>,
  }),
];

const data = [
  { nom: 'NOM', duree: '10s' },
  { nom: 'NOM', duree: '10s' },
  { nom: 'NOM', duree: '10s' },
  { nom: 'NOM', duree: '10s' },
  { nom: 'NOM', duree: '10s' },
  // Add more entries if needed
];

const DocumentPartages = ({ isDarkMode }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={`p-4 ${isDarkMode ? 'bg-dark-card-bg text-dark-text' : 'bg-light-bg text-light-text'} rounded-lg shadow-md w-full mt-4`}>
      <h2 className="text-md font-bold mb-2 text-navy-700 dark:text-white">Documents partagés ( x )</h2>
      <div className="flex flex-col md:flex-row justify-between">
        <div className="md:w-1/2" style={{ maxHeight: '20rem', overflowY: 'auto' }}>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="md:w-1/2 flex flex-col justify-center items-center mt-4 md:mt-0">
          <div className="w-full md:w-3/4">
            <Input 
              label=""
              name="phone"
              value=""
              onChange={() => {}}
              type="text"
              className="mb-4"
              placeholder="Numéro de téléphone"
              icon={<FaPhoneAlt />}
            />
          </div>
          <Button onClick={() => {}} className="bg-custom-blue text-white w-auto px-4 flex items-center justify-center">
            <FaPhone className="mr-2" /> Lancer l'appel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DocumentPartages;
