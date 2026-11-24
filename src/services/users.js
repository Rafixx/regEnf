import axios from 'axios'; // Asegúrate de tener axios instalado o usa fetch

const URLLOGIN = import.meta.env.VITE_LOGIN_URL;

export const getUserToken = async () => {
  try {
    // console.log('Token:')
    const query = new URLSearchParams(window.location.search);
    const token = query.get('token');
    return token;
  } catch (error) {
    console.error('Error al obtener el token del usuario:', error);
    throw error;
  }
};

export const getUsuario = async (token) => {
  try {
    const response = await axios(`${URLLOGIN}/get-usuario?token=${token}`);
    // console.log('Usuario:', response)

    return response.data;
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    throw error;
  }
};
