import { useState, useEffect } from 'react';
import { usePatient } from '../context/PatientContext';
import { usePlanta } from '../context/PlantaContext';
import { useIncidencia } from '../context/IncidenciaContext';
import { getMapaCamas } from '../services/mapaCamas';
import { getIncidenciasRevisar, getIncidenciasByDays } from '../services/incidencias';

import Form_incidencias from './incidencias/Form_incidencias';
import CamasPorPlanta from './mapaCamas/CamasPorPlanta'; 
import MapaCamasLeyenda from './mapaCamas/mapaCamasLeyenda'; 
import FullMapaCamas from './mapaCamas/FullMapaCamas';
import Dietario from './dietario/dietario';
import { Button, Drawer, Col, Row, Tag } from 'antd';
import {CloseOutlined } from '@ant-design/icons';

const MapaCamasContainer = () => {
  const { patient, setPatient } = usePatient();
  const { fullMap, planta } = usePlanta();
  const [ mapaCamas, setMapaCamas ] = useState([]);

  const { setIncidenciaEdited, drawerVisible, setDrawerVisible, 
          setIncidencias, startDay, filterByPlanta,
          setIncidenciasRevisar } = useIncidencia();

  useEffect(() => {
    const cargarMapaCamas = async () => {
      try {
        const datos = await getMapaCamas();
        setMapaCamas(datos);
      } catch (error) {
        console.error("Error al obtener el mapa de camas:", error);
      }
    };

    cargarMapaCamas();
  }, []); 

  useEffect(() => {
    setDrawerVisible(!!patient);
  }, [patient]);

  useEffect(() => {
    const cargarIncidencias = async () => {
      try {
        const datos = await getIncidenciasByDays(startDay);
        const datosFormateados = formatIncidencias(datos, planta, filterByPlanta);
        
        setIncidencias(datosFormateados);
      } catch (error) {
        console.error("Error al obtener los datos de incidencias:", error);
      }
    };
  
    const cargarIncidenciasRevisar = async () => {
      try {
        const datos = await getIncidenciasRevisar();
        setIncidenciasRevisar(datos);        
      } catch (error) {
        console.error("Error al obtener los datos de incidencias a revisar:", error);
      }
    };
    cargarIncidencias();
    cargarIncidenciasRevisar();
  }, [startDay, planta, filterByPlanta, drawerVisible]); 
  
  // Función auxiliar para formatear las incidencias
  function formatIncidencias(incidencias, planta, filterByPlanta) {
    let formattedData = incidencias.map(incidencia => ({
      ...incidencia,
      fecha: incidencia.fecha ? new Date(incidencia.fecha) : null
    }));
  
    if (filterByPlanta && planta) {
      formattedData = formattedData.filter(incidencia => incidencia.planta === planta);
    }
  
    return formattedData;
  }

  const closeDrawer = () => {
    setDrawerVisible(false)
    setPatient(null);    
    setIncidenciaEdited(null);
  };    

  const myDate = new Date( startDay ).toLocaleDateString('es-ES')
  const dayNotToday = new Date( startDay ).getDate() !== new Date().getDate();

  const drawerTitle = (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom:8 }}>
        <div style={{ fontSize: '16px', fontWeight: 'bold' }}>NUEVA INCIDENCIA</div>
        <Button type="text" onClick={closeDrawer} icon={<CloseOutlined />} />
      </div>
      <div style={{ backgroundColor: '#def', width: '100%', textAlign: 'center', padding: '8px 0' }}>
        {patient && patient.nombre} - {patient && patient.cama}
      </div>
      {dayNotToday && <div style={{ textAlign: 'right' }}>Se creará con fecha <span style={{ color: 'red', fontSize: '16px' }}>{myDate}</span></div>}
    </div>
  );
  
  return(
    <>
    <div key={drawerVisible} style={{padding:'15px', backgroundColor:'#eee', borderRadius:'10px'}}>
      {fullMap? 
        <Row>
          <FullMapaCamas mapaCamas={mapaCamas} />
        </Row>
      : <>
          <Row >
            <Col span={12} >
              <CamasPorPlanta planta={planta} mapaCamas={mapaCamas} />
              <MapaCamasLeyenda />
            </Col>
            <Col span={12} >
              <Dietario numDays={2}/>
            </Col>
          </Row>
          <Row >
            <Col span={24}>
              <Dietario numDays={4}/>
            </Col>
          </Row>
        </>
      }
    </div> 
    <Drawer
      title={drawerTitle}
      placement="right"
      closable={false}
      onClose={closeDrawer}
      open={drawerVisible}
      size="small"
      maskClosable={false}
      keyboard={false}
      getContainer={false}
    >
      <Form_incidencias drawerVisible={drawerVisible} />
    </Drawer>
  </>
) 
    
};

export default MapaCamasContainer;
