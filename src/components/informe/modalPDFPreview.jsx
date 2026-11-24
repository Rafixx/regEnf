import { useState, useEffect } from 'react';
import { Modal, Button } from 'antd';
import { PDFViewer } from '@react-pdf/renderer';
import PDFDocument from './PDFDocument';

const ModalPDFPreview = ({ dataToPrint, onClose }) => {
  const [isModalVisible, setIsModalVisible] = useState(true);

  useEffect(() => {
    if (dataToPrint) {
      console.log('Datos para el PDF:', dataToPrint);
    }
  }, [dataToPrint]);

  const handleOk = () => {
    setIsModalVisible(false);
    onClose();
  };

  return (
    <Modal 
      width={1200} 
      title="Previsualización del PDF" 
      open={isModalVisible} 
      onOk={handleOk} 
      onCancel={handleOk} // Cierra el modal al cancelar
    >
      <PDFViewer style={{ width: '100%', height: '1000px' }}>
        <PDFDocument incidencias={dataToPrint} />
      </PDFViewer>
    </Modal>
  );
};

export default ModalPDFPreview;
