import { Button, List, Typography } from "antd";
import { useEffect, useState } from "react";
import { InfoCircleOutlined } from "@ant-design/icons";
import { getLogsIncidencia } from "../../services/incidencias";

const { Link, Text } = Typography;

const LogIncidencia = ({ incidencia }) => {
  const [showDesc, setShowDesc] = useState(false);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const logs = await getLogsIncidencia(incidencia.idIncidencia);
        setLogs(logs);
        console.log('Logs de la incidencia:', logs);
      } catch (error) {
        console.error('Error al cargar los logs de la incidencia:', error);
      }
    };
    
    fetchLogs();
  }, [incidencia.idIncidencia]);

  const formatDate = (fecha) => {
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES') + ' - ' + date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  };

  const formatIncidenciaTxt = (incidenciaTxt) => {
    console.log('Processing incidenciaTxt:', incidenciaTxt);
    if (typeof incidenciaTxt === 'string') {
      try {
        const parsed = JSON.parse(incidenciaTxt);
        console.log('Parsed JSON:', parsed);
        return Object.entries(parsed)
          .map(([key, value]) => `${key}: ${value}`)
          .join('\n');
      } catch (error) {
        console.log('Error parsing JSON:', error);
        return incidenciaTxt;
      }
    }
    return String(incidenciaTxt);
  };
  
  return (
    <>
      {/* <Button type="primary" onClick={() => setShowDesc(!showDesc)} icon={<InfoCircleOutlined />} />
      {showDesc && (
        <> */}
          <Text>Últimos logs</Text>
          <List
            bordered
            dataSource={logs.slice(0, 3)}
            renderItem={(log) => (
              <List.Item>
                <Text style={{ width: '150px' }} >{formatDate(log.fecha)}</Text>
                <Text style={{ width: '100px', marginLeft: 16 }}>{log.usuario}</Text>
                <Text style={{ width: '200px', marginLeft: 16 }}>{log.estado}</Text>
                <Text style={{ width: '300px', marginLeft: 16 }}>{formatIncidenciaTxt(log.incidenciaTxt)}</Text>
              </List.Item>
            )}
          />
          {logs.length > 3 && (
            <Link href={`http://vvdpedwebpre01:3006/api/logs/${incidencia.idIncidencia}`} target="_blank">
              Ver todos los logs
            </Link>
          )}
        {/* </>
      )} */}
    </>
  );
};

export default LogIncidencia;
