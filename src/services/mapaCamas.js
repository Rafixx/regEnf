import axios from 'axios'; // Asegúrate de tener axios instalado o usa fetch

const URLAPI = import.meta.env.VITE_API_URL;

export const getMapaCamas = async () => {
  try {
    const response = await axios(`${URLAPI}/mapaCamas`);
    return response.data; // Retorna los datos recibidos
  } catch (error) {
    console.error('Error al cargar los datos del mapa de camas:', error);
    throw error; // Lanza el error para manejarlo en el componente
  }
};

export const getPacientesXServicio = async () => {
  try {
    const response = await axios(`${URLAPI}/pacientesXServicio`);
    return response.data;
  } catch (error) {
    console.error(
      'Error al cargar los datos de pacientes por servicio:',
      error,
    );
    throw error;
  }
};

export const getCamasOcupadas = async () => {
  try {
    const response = await axios(`${URLAPI}/camasOcupadas`);
    return response.data;
  } catch (error) {
    console.error('Error al cargar los datos de camas ocupadas:', error);
    throw error;
  }
};

export const getCamasGrua = async () => {
  try {
    const response = await axios(`${URLAPI}/camasGrua`);
    return response.data;
  } catch (error) {
    console.error('Error al cargar los datos de camas con grúa:', error);
    throw error;
  }
};

export const getAisladosPreve = async () => {
  try {
    const response = await axios(`${URLAPI}/aisladosPreve`);
    return response.data;
  } catch (error) {
    console.error(
      'Error al cargar los datos de aislados por Preventiva:',
      error,
    );
    throw error;
  }
};

export const getAisladosEnf = async () => {
  try {
    const response = await axios(`${URLAPI}/aisladosEnf`);
    return response.data;
  } catch (error) {
    console.error(
      'Error al cargar los datos de aislados por enfermería:',
      error,
    );
    throw error;
  }
};

export const getCamasInhabilitadas = async () => {
  try {
    const response = await axios(`${URLAPI}/camasInhabilitadas`);
    return response.data;
  } catch (error) {
    console.error('Error al cargar los datos de camas inhabilitadas:', error);
    throw error;
  }
};
