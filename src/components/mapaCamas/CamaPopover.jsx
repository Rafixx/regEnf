// CamaPopover.js
import React from 'react';
import { Popover } from 'antd';
import '../../assets/css/mapaCamas.css'

const CamaPopover = ({ datosOcupacion, fechaGrua, detalleAisladoPreve, detalleAisladoEnf, detalleAisladoEnfOtro, children }) => {
  return (
    <Popover 
      content={
        <div className='infoCamaPopOver'>
          {datosOcupacion && (
            <>
              <p>Paciente: {datosOcupacion.paciente.trim()}</p>
              <p>NHC: {datosOcupacion.nhc}</p>
              <p>Servicio: {datosOcupacion.serv_med}</p>
            </>
          )}
          {fechaGrua && <p>Grúa disponible desde: {fechaGrua}</p>}
          {detalleAisladoPreve && <p>Aislamiento Preventivo: {detalleAisladoPreve}</p>}
          {detalleAisladoEnf && <p>Aislamiento Enfermería: {detalleAisladoEnf}</p>}
          {detalleAisladoEnfOtro && <p> {detalleAisladoEnfOtro}</p>}
        </div>
      } 
      title="Información del Paciente" 
      trigger="hover"
      // style={{ backgroundColor: '#000', borderColor: '#bbb' }} 
    >
        {children}
    </Popover>
  );
};

export default CamaPopover;
