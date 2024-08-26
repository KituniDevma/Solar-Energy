import React, { createContext, useState } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');

  return (
    <DataContext.Provider value={{ data, setData, location, setLocation }}>
      {children}
    </DataContext.Provider>
  );
};
