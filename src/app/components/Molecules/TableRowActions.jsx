'use client';

import React from 'react';
import IconButton from '../Atoms/IconButton';

const TableRowActions = ({ onDelete, index }) => (
  <div className="flex justify-end space-x-2 pr-4">
    <IconButton icon="eye" className="text-gray-500 cursor-pointer" size={12} />
    <IconButton icon="key" className="text-gray-500 cursor-pointer" size={12} />
    <IconButton icon="minus" className="bg-red-600 text-white" size={8} onClick={() => onDelete(index)} />
  </div>
);

export default TableRowActions;
