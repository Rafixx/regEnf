import React from 'react';
import { useIncidencia } from '../../context/IncidenciaContext';
import { normalizeDate } from '../../utils/helper';
import { usePlanta } from '../../context/PlantaContext';
import { DatePicker, Menu, Space, Tooltip } from 'antd';
import ModalPDFPreview from '../informe/modalPDFPreview';
import ModalConfigPDF from '../informe/modalConfigPDF';
import IncidenciasRevisarList from '../incidencias/incidencias_revisar';
import dayjs from 'dayjs';
import { getFormatDate } from '../../utils/helper';
import '../../assets/css/app.css';

const Header = () => {
  const { setPlanta, setFullMap } = usePlanta();
  const { setStartDay } = useIncidencia();
  const plantas = ['1A', '2A', '2B', '3A', '3B'];

  const items = plantas.map(planta => ({
    label: `PLANTA ${planta}`,
    key: planta,
    className: 'menu-item',
    onClick: () => setFullMap(false),
  }));

  // const itemFullMapaCamas = {
  //   label: 'full mapa camas',
  //   key: '99',
  //   className: 'menu-item',
  //   onClick: () => setFullMap(true),
  // };

  const handleGoToDay = (date, dateString) => {
    const today = new Date();
    
    // Compara solo la parte de la fecha (sin la hora)
    if (normalizeDate(date).toISOString().split('T')[0] === normalizeDate(today).toISOString().split('T')[0]) {
      // Asigna el día actual con hora y todo
      setStartDay(today);
      console.log('today:', today);
      
    } else {
      // Asigna `fromDate` si no es el día actual
      const fromDate = normalizeDate(date);
      setStartDay(fromDate);
      console.log('fromDate:', fromDate);
    }
  };
  

  return (
    <div className='nav-bar'>
      <div className='menu'>
        <Menu 
          mode="horizontal" 
          items={[ ...items ]} 
          // defaultSelectedKeys={[items[0].key]}
          // theme='dark'
          // items={[...items, itemFullMapaCamas]} 
          // inlineCollapsed={collapsed}
          onClick={({ key }) => setPlanta(key)}           
        />
      </div>
      <div className='show-day'>
        <Space>    
          <Tooltip title='Listado de incidencias para revisar' placement="bottomRight">
            <IncidenciasRevisarList />
          </Tooltip>
          <Tooltip title='Generar informe PDF' placement="bottomRight">  
            {/* <ModalPDFPreview /> */}
            <ModalConfigPDF />
          </Tooltip>
          <Tooltip title="Ir a día...">
            <DatePicker
              format="DD/MM/YYYY"
              defaultValue={dayjs()}
              allowClear={false}
              // size='middle'
              placeholder="Ir a día..."
              onChange={handleGoToDay}
            />
          </Tooltip>
          <Tooltip title="Información obtenida el día y hora...">
            {/* Hoy es: <strong> {getToday()} </strong> */}
            Hoy es: <strong> {getFormatDate( new Date(), 'textlong' )} </strong>
          </Tooltip>
        </Space>        
      </div>
    </div>
  )
};

export default Header;
