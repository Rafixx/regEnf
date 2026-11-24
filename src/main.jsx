import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './router/router'
import { ConfigProvider } from 'antd';
import { PlantaProvider } from './context/PlantaContext';
import { PatientProvider } from './context/PatientContext';
import { IncidenciaProvider } from './context/IncidenciaContext';
import { UserProvider } from './context/UserContext';
import esES from 'antd/lib/locale/es_ES';

ReactDOM.createRoot(document.getElementById('root')).render(
  <PatientProvider>
    <PlantaProvider>
      <UserProvider>
        <IncidenciaProvider>
          <ConfigProvider 
            locale={esES}
            componentSize="middle"
          >
            <Router />
          </ConfigProvider>
        </IncidenciaProvider>
      </UserProvider>
    </PlantaProvider>
  </PatientProvider>
)
