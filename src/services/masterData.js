import axios from 'axios';

const URLAPI = import.meta.env.VITE_API_URL;

export const getMasterData = async (suffix) => {
  try {
    // Construir URL basada en si se proporciona un idPaciente o no
    const url = `${URLAPI}/${suffix}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return null; // Devolver null o manejar el error según sea necesario
  }
};

export const loadData = async (
  getDataFunction,
  key,
  setOptions,
  propertyName = 'nombre',
) => {
  try {
    const datos = await getDataFunction();
    if (datos) {
      const opcionesFormato = datos.map((item) => ({
        label: item[propertyName],
        value: item[propertyName],
      }));

      setOptions((opcionesPrevias) => ({
        ...opcionesPrevias,
        [key]: opcionesFormato,
      }));
    }
  } catch (error) {
    console.log('Error al cargar datos', error);
  }
};

export const getMotivosAlta = async () => {
  return getMasterData('motivoAlta');
};
export const getMotivosBloqueo = async () => {
  return getMasterData('motivoBloqueo');
};
export const getDestinoAlta = async () => {
  return getMasterData('destinoAlta');
};
export const getLugarCaida = async () => {
  return getMasterData('lugarCaida');
};
export const getMotivoAusente = async () => {
  return getMasterData('motivoAusente');
};
export const getProgramasAsistenciales = async () => {
  return getMasterData('programasAsistenciales');
};
export const getTipoBloqueo = async () => {
  return getMasterData('tipoBloqueo');
};
export const getTipoSalidaRegreso = async () => {
  return getMasterData('tipoSalidaRegreso');
};
