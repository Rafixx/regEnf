import React, { useState } from 'react';
import { Modal, Button, Badge } from 'antd';
import { ExclamationOutlined } from '@ant-design/icons';
import { useIncidencia } from '../../context/IncidenciaContext';
import IncidenciaCard from "../dietario/IncidenciaCard";
import "../../assets/css/dietario.css";

const IncidenciasRevisarList = () => {
  const { incidenciasRevisar } = useIncidencia();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      {incidenciasRevisar.length > 0 && 
      <Badge 
        count={incidenciasRevisar.length} 
      >
        <Button 
            danger 
            size='middle' 
            icon={<ExclamationOutlined />} 
            onClick={showModal}
          />
      </Badge>
      }
        <Modal 
          destroyOnClose
          open={isModalVisible} 
          title="Incidencias para revisar" 
          onOk={handleOk} 
          onCancel={handleCancel}
          footer={(_, { OkBtn }) => (<OkBtn />)}
        >
          <div className="incidenciasRevisar-container">
            {incidenciasRevisar && incidenciasRevisar.map((incidencia, index) => (
              <div key={incidencia.idIncidencia}>
                <IncidenciaCard incidencia={incidencia} />
              </div>
            ))}
          </div>
        </Modal>
    </>
  );
};

export default IncidenciasRevisarList;
