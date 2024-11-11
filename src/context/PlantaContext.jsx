import React, { createContext, useContext, useState } from 'react';

const PlantaContext = createContext();

export const usePlanta = () => useContext(PlantaContext);

export const PlantaProvider = ({ children }) => {
  const [planta, setPlanta] = useState('1A')
  const [fullMap, setFullMap] = useState(false)

  return (
    <PlantaContext.Provider value={{ planta, setPlanta, fullMap, setFullMap }}>
      {children}
    </PlantaContext.Provider>
  );
};
