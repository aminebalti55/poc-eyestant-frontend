import { useState } from 'react';

export const useCrud = (initialData) => {
  const [data, setData] = useState(initialData);

  const handleAdd = (newData) => {
    setData([...data, newData]);
  };

  const handleDelete = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  return {
    data,
    handleAdd,
    handleDelete,
  };
};
