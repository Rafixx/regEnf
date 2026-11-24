import axios from 'axios'; // Asegúrate de tener axios instalado o usa fetch

const URLAPI = import.meta.env.VITE_API_URL;

export const getIncidenciasByDays = async (startDay) => {
  try {
    const numDays = 10; //pongo fijo los días que recupera información
    if (startDay && numDays) {
      const day = startDay.getDate(); // Obtiene el día del mes (1-31)
      const month = startDay.getMonth() + 1; // Obtiene el mes (0-11), +1 porque JavaScript cuenta meses desde 0
      const year = startDay.getFullYear();

      const params = new URLSearchParams({
        day,
        month,
        year,
        numDays,
      }).toString();

      const response = await axios(`${URLAPI}/incidencias/day?${params}`);

      // const response = await axios(`${URLAPI}/incidenciasDays/7`);
      // const response = await axios(`${URLAPI}/incidencias/${days}/day`)
      return response.data; // Retorna los datos recibidos
    }
  } catch (error) {
    console.error('Error al cargar los datos del mapa de camas:', error);
    throw error; // Lanza el error para manejarlo en el componente
  }
};

export const getIncidenciasRevisar = async () => {
  try {
    const response = await axios(`${URLAPI}/incidencias/revisar`);
    return response.data;
  } catch (error) {
    console.error('Error al cargar los datos de incidencias a revisar:', error);
    throw error;
  }
};

export const postIncidencia = async (incidencia) => {
  try {
    const response = await axios.post(`${URLAPI}/incidencias`, incidencia);
    return response.data;
  } catch (error) {
    console.error('Error al guardar la incidencia:', error);
    throw error;
  }
};

export const putIncidencia = async (incidencia) => {
  try {
    const idIncidencia = incidencia.idIncidencia;
    const response = await axios.put(
      `${URLAPI}/incidencias/${idIncidencia}`,
      incidencia,
    );
    return response.data;
  } catch (error) {
    console.error('Error al editar la incidencia:', error);
    throw error;
  }
};

export const handleEstadoIncidencia = async (incidencia) => {
  try {
    const idIncidencia = incidencia.idIncidencia;
    const response = await axios.put(
      `${URLAPI}/incidencias/${idIncidencia}/estado`,
      incidencia,
    );
    return response.data;
  } catch (error) {
    console.error('Error al cambiar el estado de la incidencia:', error);
    throw error;
  }
};

export const getLogsIncidencia = async (idIncidencia) => {
  try {
    const response = await axios(`${URLAPI}/logs/${idIncidencia}`);
    return response.data;
  } catch (error) {
    console.error('Error al cargar los logs de la incidencia:', error);
    throw error;
  }
};
