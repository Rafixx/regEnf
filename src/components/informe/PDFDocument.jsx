import { Page, Text, View, Document } from '@react-pdf/renderer';
import { styles } from './PDFStyles'; // Estilos para el documento PDF

const PDFDocument = ({ incidencias }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page} orientation="landscape">
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={[styles.tableColHeader, styles.tableCellHeader, {width: '50px'}]}>Fecha</Text>
            <Text style={[styles.tableColHeader, styles.tableCellHeader, {width: '50px'}]}>Hora</Text>
            <Text style={[styles.tableColHeader, styles.tableCellHeader, {width: '50px'}]}>Planta</Text>
            <Text style={[styles.tableColHeader, styles.tableCellHeader, {width: '200px'}]}>Paciente</Text>
            <Text style={[styles.tableColHeader, styles.tableCellHeader, {width: '50px'}]}>Cama</Text>
            <Text style={[styles.tableColHeader, styles.tableCellHeader, {width: '130px'}]}>Tipo</Text>
            <Text style={[styles.tableColHeader, styles.tableCellHeader, {width: '300px'}]}>Detalle</Text>
          </View>
          {incidencias && incidencias.map((incidencia, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.tableCol, styles.tableCell, {width: '50px'} ]}>
                {new Date(incidencia.fecha).toLocaleDateString('es-ES')}
              </Text>
              <Text style={[styles.tableCol, styles.tableCell, {width: '50px'}]}>
                {new Date(incidencia.fecha).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
              </Text>
              <Text style={[styles.tableCol, styles.tableCell, {width: '50px'}]}>{incidencia.planta}</Text>
              <Text style={[styles.tableCol, styles.tableCell, {width: '200px'}]}>{incidencia.paciente}</Text>
              <Text style={[styles.tableCol, styles.tableCell, {width: '50px'}]}>{incidencia.cama}</Text>
              <Text style={[styles.tableCol, styles.tableCell, {width: '130px'}]}>{incidencia.tipo}</Text>
              <Text style={[styles.tableCol, styles.tableCell, {width: '300px'}]}>
                {Object.entries(incidencia.detalle)
                  .filter(([key]) => key !== 'idIncidencia')
                  .map(([key, value]) => `${key}: ${value}`)
                  .join('\n')}
              </Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default PDFDocument;
