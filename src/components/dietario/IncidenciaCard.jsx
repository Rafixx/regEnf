import React from 'react';
import { Alert, Dropdown, Tag, Popover } from 'antd';
import { EditTwoTone, CheckCircleTwoTone , DeleteTwoTone, SyncOutlined } from '@ant-design/icons';
import { usePatient } from '../../context/PatientContext';
import { useIncidencia } from '../../context/IncidenciaContext';
import { useUser } from '../../context/UserContext';
import { handleEstadoIncidencia } from '../../services/incidencias';
import { useState } from 'react';
import LogIncicencia from '../incidencias/LogIncidencia';
import { itemNoUser } from '../customComponents/UnauthorizedUser';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

import "../../assets/css/dietario.css";

const IncidenciaCard = ({ incidencia }) => {
  const { user } = useUser();
  const { setPatient } = usePatient();
  const [ myIncidencia, setMyIncidencia ] = useState(incidencia); // [1
  const { setIncidenciaEdited, incidenciasRevisar, setIncidenciasRevisar } = useIncidencia();

  const incidenciaFecha = dayjs(incidencia.fecha).format('DD/MM/YYYY');
  const incidenciaHora = dayjs(incidencia.fecha).format('HH:mm');

  // Función auxiliar para manejar el detalle de cada tipo de incidencia
  const renderDetalle = (detalle) => {    
    // Verifica si detalle es undefined o null antes de proceder
    if (!detalle) {      
      return <p>No hay información disponible de este tipo de incidencia</p>; // O cualquier otro manejo deseado
    }

    // Ahora procedemos sabiendo que detalle es un objeto válido
    return Object.entries(detalle).map(([key, value], index) => {
      if (key === "idIncidencia") return null; // Continuamos excluyendo el idIncidencia
      let formattedValue = value
      
      if ( key.toLowerCase().includes('fecha') )
        formattedValue = dayjs(value).format('DD/MM/YYYY') 
      if (key.toLowerCase().includes('hora')) {
        const dayjsDate = dayjs(value, 'HH:mm:ss');
        if (dayjsDate.isValid()) {
          formattedValue = dayjsDate.format('HH:mm');
        } else {
          console.error('Fecha inválida:', value);
        }
      }
      
      return <div key={index}>
              {`${key}: ${formattedValue}`}
            </div>;
    }).filter(Boolean); // Filtramos los null para excluirlos
  };

  const handleEditIncidencia = (e) => {
    const myPatient = {
      nombre: myIncidencia.paciente.trim(),
      cama: myIncidencia.cama,
    }
    setPatient(myPatient);
    setIncidenciaEdited(myIncidencia);
  }
  
  const handleChangeState = async (newEstado) => {
    try {
      const newIncidencia = {
        ...myIncidencia,
        estado: newEstado,
      }
      
      setMyIncidencia(newIncidencia);
      await handleEstadoIncidencia(newIncidencia);
    } catch (error) {
      console.error('Error al cambiar el estado de la incidencia:', error);
    }
  }

  const handleIncidenciaRevisar = () => {
    handleChangeState('PENDIENTE')
    // console.log('Incidencia a revisar:', myIncidencia);
    
    const newIncidenciasRevisar = incidenciasRevisar.filter(incidencia => incidencia.idIncidencia !== myIncidencia.idIncidencia);   
    setIncidenciasRevisar(newIncidenciasRevisar);
  }

  const itemNoUser = [
    {
      label: (<Alert message='Debe acceder desde ORION CLINIC para poder cambiar el estado de la incidencia' type='warning' showIcon  />),
      key: 'noUser',
      // icon: <DeleteTwoTone twoToneColor='#ff0000' style={{ fontSize: iconSize }} />      
    },
  ]

  const iconSize = '1.4em'
  const getMenuItems = (estado) => {
    const modificarIncidencia = [
      {
        label: 'Modificar incidencia',
        key: '1',
        icon: <EditTwoTone style={{ fontSize: iconSize }} />,
        onClick: handleEditIncidencia,
      }
    ];
    const eliminarIncidencia = [
      {
        label: 'Eliminar incidencia',
        key: '2',
        icon: <DeleteTwoTone twoToneColor='#ff0000' style={{ fontSize: iconSize }} />,
        onClick: () => handleChangeState('ELIMINADA'),
  }
    ];
  
    switch (estado) {
      case 'PENDIENTE':
        return [
          ...modificarIncidencia,
          ...eliminarIncidencia,
          {
            label: 'Marcar como resuelta',
            key: '3',
            icon: <CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: iconSize }} />,
            onClick: () => handleChangeState('RESUELTA'),
          },
        ];
      case 'RESUELTA':
        return [
          ...modificarIncidencia,
          {
            label: 'Marcar como pendiente',
            key: '4',
            icon: <CheckCircleTwoTone twoToneColor="#faad14" style={{ fontSize: iconSize }} />,
            onClick: () => handleChangeState('PENDIENTE'),
          },
        ];
      case 'ELIMINADA':
        return [
          {
            label: 'Restaurar incidencia',
            key: '5',
            icon: <SyncOutlined twoToneColor="#52c41a" style={{ fontSize: iconSize }} />,
            onClick: () => handleChangeState('PENDIENTE'),
          },
        ];
      case 'REVISAR':
        return [
          ...modificarIncidencia,
          ...eliminarIncidencia,
          {
            label: 'Marcar como pendiente',
            key: '6',
            icon: <CheckCircleTwoTone twoToneColor="#faad14" style={{ fontSize: iconSize }} />,
            onClick: () => handleIncidenciaRevisar(),
          },
        ];
      default:
        return [];
    }
  }
    
  const content = (
    <div className='incidenciaUsuario'>
      {/* <div>Usuario que crea la incidencia: {myIncidencia.usuario}</div>
      <div>Incidencia creada el {incidenciaFecha} a las {incidenciaHora}</div> */}
      <LogIncicencia incidencia={myIncidencia} />
    </div>
  );

  const getClassNameForIncidencia = (estado) => {
    switch (estado) {
      case 'ELIMINADA':
        return 'incidencia-eliminada';
      case 'PENDIENTE':
        return 'incidencia-pendiente';
      case 'RESUELTA':
        return 'incidencia-resuelta';
      case 'REVISAR':
        return 'incidencia-revisar';
      default:
        return ''; // una clase predeterminada o vacío si no necesitas una clase específica
    }
  }
  
  return (
    <Dropdown
      menu={user && user.username?{ items: getMenuItems(myIncidencia.estado) }: { items: itemNoUser } }
      trigger={['contextMenu']}
    >
      <div className={`incidencia ${getClassNameForIncidencia(myIncidencia.estado)}`}> {/* Aplica la clase basada en el estado */}
        <div>
          <div className='incidenciaTitle'> 
            <div className="incidenciaTitlePatient">
              {myIncidencia.paciente.trim()}
            </div>
            <div className='incidenciaTitleLocation'>
              <Popover content={content} >  
                <Tag color='orange' >{myIncidencia.cama}</Tag>
              </Popover>
              {myIncidencia.programa && <Tag color='blue' >{myIncidencia.programa}</Tag>}
            </div>
          </div> 
          
          <div className='incidenciaDetalle'>
            {renderDetalle(myIncidencia.detalle)}
          </div>      
        </div>

        <div className='incidenciaTipo'> 
          {myIncidencia.tipo}
        </div>        
      </div>
    </Dropdown>
  );
};

export default IncidenciaCard;

