import React, { createContext, useContext, useState } from 'react';

const IncidenciaContext = createContext();

export const useIncidencia = () => useContext(IncidenciaContext);

export const IncidenciaProvider = ({ children }) => {
  const [incidencias, setIncidencias] = useState([]);
  const [incidenciasRevisar, setIncidenciasRevisar] = useState([]);
  const [incidenciaEdited, setIncidenciaEdited] = useState();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [startDay, setStartDay] = useState(new Date());
  const [filterByPlanta, setFilterByPlanta] = useState(true);

  return (
    <IncidenciaContext.Provider value={{
      incidencias,
      setIncidencias,
      incidenciasRevisar,
      setIncidenciasRevisar,
      incidenciaEdited,
      setIncidenciaEdited,
      drawerVisible,
      setDrawerVisible,
      startDay,
      setStartDay,
      filterByPlanta,
      setFilterByPlanta,
    }}>
      {children}
    </IncidenciaContext.Provider>
  );
};
