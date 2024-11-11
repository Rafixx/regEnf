import { useState } from 'react';
import { Modal, Button, InputNumber, Slider, Table } from 'antd';
import { FilePdfTwoTone } from '@ant-design/icons';
import ModalPDFPreview from './modalPDFPreview';
import { Typography } from 'antd';
import { useIncidencia } from '../../context/IncidenciaContext';
import { getFormatDate, normalizeDate, getDay } from '../../utils/helper';

import '../../assets/css/stylePDF.css'
import { useEffect } from 'react';

const ModalConfigPDF = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState(1);
  const {startDay, incidencias} = useIncidencia();
  const[ incidenciasToPrint, setIncidenciasToPrint ] = useState([]);
  const [showPDFPreview, setShowPDFPreview] = useState(false); // Nuevo estado para controlar el PDF preview
  const [filteredAndSortedData, setFilteredAndSortedData] = useState([]); 

  useEffect(() => {
    // Crea el rango de fechas desde `startDay` hasta `startDay` - inputValue días
    const days = [];
    for (let i = 0; i <= inputValue; i++) {
      const date = new Date(startDay);
      date.setDate(date.getDate() - i);
      days.push(normalizeDate(date).toISOString().split('T')[0]); // Convertimos a string para comparación
    }
  
    // Filtra las incidencias que tienen su fecha dentro del rango exacto generado
    const filteredData = incidencias.filter((incidencia) => {
      const incidenciaDate = normalizeDate(new Date(incidencia.fecha)).toISOString().split('T')[0];
      return days.includes(incidenciaDate);
    });
  
    setIncidenciasToPrint(filteredData);
    setFilteredAndSortedData(filteredData)
  }, [inputValue, startDay, incidencias]);

  const showModal = () => {    
    setInputValue(0);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setShowPDFPreview(true); 
    // setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onChange = (newValue) => {
    setInputValue(newValue);
  };

  const cols = [
    {
      title: 'Fecha',
      dataIndex: 'fecha',
      key: 'fecha',
      render(fecha) {
        return getFormatDate(fecha, 'short');
      },
      sorter(a, b) {
        return a.fecha - b.fecha;
      },
    },
    {
      title: 'Hora',
      dataIndex: 'fecha',
      key: 'hora',
      render(fecha) {
        return getFormatDate(fecha, 'hour');
      }
    },
    {
      title: 'Planta',
      dataIndex: 'planta',
      key: 'planta',
      sorter(a, b) {
        return a.planta.localeCompare(b.planta);
      },
      filters: [
        { text: '1A', value: '1A' },
        { text: '2A', value: '2A' },
        { text: '2B', value: '2B' },
        { text: '3A', value: '3A' },
        { text: '3B', value: '3B' },
      ],
      onFilter: (value, record) => record.planta.indexOf(value) === 0,
    },
    // {
    //   title: 'Estado',
    //   dataIndex: 'estado',
    //   key: 'estado',
    //   sorter(a, b) {
    //     return a.estado.localeCompare(b.estado);
    //   },
    //   filters: [
    //     { text: 'PENDIENTE', value: 'PENDIENTE' },
    //     { text: 'REVISAR', value: 'REVISAR' },
    //     { text: 'RESUELTA', value: 'RESUELTA' },
    //     { text: 'ELIMINADA', value: 'ELIMINADA' },
    //   ],
    // },
    {
      title: 'Paciente',
      dataIndex: 'paciente',
      key: 'paciente',
    },
    {
      title: 'Cama',
      dataIndex: 'cama',
      key: 'cama',
      sorter(a, b) {
        return a.cama.localeCompare(b.cama);
      }
    },
    {
      title: 'Tipo',
      dataIndex: 'tipo',
      key: 'tipo',
      sorter(a, b) {
        return a.tipo.localeCompare(b.tipo);
      },
    },
    {
      title: 'Programa',
      dataIndex: 'programa',
      key: 'programa',
      sorter(a, b) {
        return a.programa.localeCompare(b.programa);
      },
    },
    {
      title: 'Detalle',
      dataIndex: 'detalle',
      key: 'detalle',
      render: (detalle) => (
        <div>
          {Object.entries(detalle)
            .filter(([key]) => key !== 'idIncidencia')
            .map(([key, value]) => `${key}: ${value}`)
            .join('\n')}
        </div>
      )
    }
  ];
  
  const handleTableChange = (pagination, filters, sorter) => {
    let updatedData = [...incidenciasToPrint]; // Copia de los datos originales
  
    // Aplicar los filtros
    if (filters.planta) {
      updatedData = updatedData.filter((incidencia) => 
        filters.planta.includes(incidencia.planta));
    }
    // if (filters.estado && filters.estado.length > 0) {
    //   updatedData = updatedData.filter((incidencia) => 
    //     filters.estado.includes(incidencia.estado)
    //   );
    // }
  
    // Aplicar la ordenación
    if (sorter.order) {
      updatedData = updatedData.sort((a, b) => {
        if (sorter.field === 'fecha') {
          return sorter.order === 'ascend' 
            ? new Date(a.fecha) - new Date(b.fecha)
            : new Date(b.fecha) - new Date(a.fecha);
        }
        if (sorter.field === 'planta' || sorter.field === 'cama') {
          return sorter.order === 'ascend'
            ? a[sorter.field].localeCompare(b[sorter.field])
            : b[sorter.field].localeCompare(a[sorter.field]);
        }
        if(sorter.field === 'tipo'){
          return sorter.order === 'ascend'
            ? a.tipo.localeCompare(b.tipo)
            : b.tipo.localeCompare(a.tipo);
        }
        if(sorter.field === 'programa'){
          return sorter.order === 'ascend'
            ? a.programa.localeCompare(b.programa)
            : b.programa.localeCompare(a.programa);
        }
        // if(sorter.field === 'estado'){
        //   return sorter.order === 'ascend'
        //     ? a.estado.localeCompare(b.estado)
        //     : b.estado.localeCompare(a.estado);
        // }
        return 0;
      });
    }
    setFilteredAndSortedData(updatedData);
  };
    
  return (
    <>
      <Button 
        // size="large" 
        type='default' 
        icon={<FilePdfTwoTone twoToneColor='#cd201f' />} 
        onClick={showModal}
      />
      <Modal 
        width={1200} 
        title="Configuración del PDF" 
        open={isModalVisible} 
        onOk={handleCancel} //{handleOk} 
        okText=""
        // okText="Generar PDF"
        onCancel={handleCancel}
        cancelText="Volver"
      >
        <div className="flex-title ">
          <Typography className="label">
            Desde {getFormatDate(getDay(startDay, inputValue * -1), 'long')} hasta {getFormatDate(startDay, 'long')}
          </Typography>
        </div>
        <div className="flex-container">
          <Typography className="label">Días previos</Typography>
          <Slider
            className="slider-container"
            defaultValue={0}
            min={0}
            max={5}
            onChange={onChange}
            value={typeof inputValue === 'number' ? inputValue : 0}
          />
          <InputNumber
            defaultValue={0}
            min={0}
            max={5}
            className="input-number"
            value={inputValue}
            onChange={onChange}
          />
        </div>

        <div className="flex-container">
          <Table 
            columns={cols} 
            dataSource={filteredAndSortedData.map((item) => ({ ...item, key: item.idIncidencia }))}
            pagination={{pageSize:12}} 
            size="small" 
            onChange={handleTableChange}
            key={incidenciasToPrint.length} 
          />

        </div>
      </Modal>
      {/* {showPDFPreview && (
        <ModalPDFPreview dataToPrint={filteredAndSortedData} onClose={() => setShowPDFPreview(false)} />
      )} */}

    </>
  );
};

export default ModalConfigPDF;