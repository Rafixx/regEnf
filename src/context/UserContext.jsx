import React, { createContext, useContext, useEffect, useState } from 'react'
import { getUserToken, getUsuario } from '../services/users';

const UserContext = createContext()

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [ user, setUser ] = useState({})
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await getUserToken();

        if (token) {
          const usuario = await getUsuario(token);
          
          if (usuario && usuario.usuario) {
            const user = {
              username: usuario.usuario
            };
            setUser(user);
          }
        }
        // else {
        //   console.error('No se ha podido obtener el token de usuario');
        //   setUser({username: 'Desconocido'});
        // }
      } catch (error) {
        console.error('Error al obtener el usuario:', error);
      }
    };
    
    fetchUserData();
  }, [])
    
  return (
    <UserContext.Provider value={{ 
      user, 
      setUser, 
    }}>
      {children}
    </UserContext.Provider>
  )
}
