'use client';

import React from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

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
  columnHelper.accessor('date', {
    header: () => <span className="text-xs">DATE</span>,
    cell: info => <span className="text-xs">{info.getValue()}</span>,
  }),
  columnHelper.accessor('heure', {
    header: () => <span className="text-xs">HEURE</span>,
    cell: info => <span className="text-xs">{info.getValue()}</span>,
  }),
  columnHelper.accessor('numero', {
    header: () => <span className="text-xs">NUMERO</span>,
    cell: info => <span className="text-xs">{info.getValue()}</span>,
  }),
];

const data = [
  { nom: 'NOM', duree: '50s', date: '15 Fev 2024', heure: '11:05', numero: '+216 22 222 XXX' },
  { nom: 'NOM', duree: '50s', date: '15 Fev 2024', heure: '11:05', numero: '+216 22 222 XXX' },
  { nom: 'NOM', duree: '50s', date: '15 Fev 2024', heure: '11:05', numero: '+216 22 222 XXX' },
  { nom: 'NOM', duree: '50s', date: '15 Fev 2024', heure: '11:05', numero: '+216 22 222 XXX' },
];

const MesAppels = () => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const customScrollbarStyle = {
    maxHeight: '20rem',
    overflowY: 'auto',
    scrollbarWidth: 'thin',
    scrollbarColor: '#422afb #f1f1f1',
  };

  const customScrollbarWebkitStyle = `
    ::-webkit-scrollbar {
      width: 8px;
    }
    ::-webkit-scrollbar-track {
      background: #f1f1f1;
    }
    ::-webkit-scrollbar-thumb {
      background-color: #422afb;
      border-radius: 10px 10px 0 0;
      border: 2px solid #f1f1f1;
    }
    ::-webkit-scrollbar-thumb:hover {
      background-color: #422afb;
    }
  `;

  return (
    <div className="p-2 bg-white rounded-lg shadow-md w-full md:w-1/2">
      <style>{customScrollbarWebkitStyle}</style>
      <h2 className="text-md font-bold mb-2 text-navy-700">Appels</h2>
      <div style={customScrollbarStyle}>
        <table className="w-full table-fixed">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id} className="!border-px !border-gray-400">
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    onClick={header.column.getToggleSortingHandler()}
                    className="cursor-pointer border-b border-gray-200 pb-2 pr-4 pt-4 text-start dark:border-white/30"
                  >
                    <div className="flex items-center justify-between text-xs text-gray-600 dark:text-white">
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
    </div>
  );
};

export default MesAppels;
