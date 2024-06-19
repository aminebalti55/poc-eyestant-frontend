'use client';

import React from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import TableRowActions from '../Molecules/TableRowActions';

const columnHelper = createColumnHelper();

const Table = ({ data, columns, onEdit, onDelete }) => {
  const [sorting, setSorting] = React.useState([]);

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const customScrollbarStyle = {
    maxHeight: '9rem', 
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
      border-radius: 10px 10px 5px 5px; 
      border: 2px solid #f1f1f1;
    }
    ::-webkit-scrollbar-thumb:hover {
      background-color: #422afb;
    }
  `;

  return (
    <div style={customScrollbarStyle} className="mt-8">
      <style>{customScrollbarWebkitStyle}</style>
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
                <TableRowActions onEdit={onEdit} onDelete={onDelete} index={row.index} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
