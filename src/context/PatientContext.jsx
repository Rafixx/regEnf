import React, { createContext, useContext, useState } from 'react'

const PatientContext = createContext()

export const usePatient = () => useContext(PatientContext);

export const PatientProvider = ({ children }) => {
  const [patient, setPatient] = useState('')

  return (
    <PatientContext.Provider value={{ patient, setPatient }}>
      {children}
    </PatientContext.Provider>
  )
}
