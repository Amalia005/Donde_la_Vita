import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const ContextoSocket = createContext(null);

export function ProveedorSocket({ children }) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const conexion = io('http://localhost:3001');
    setSocket(conexion);

    return () => conexion.disconnect();
  }, []);

  return (
    <ContextoSocket.Provider value={{ socket }}>
      {children}
    </ContextoSocket.Provider>
  );
}

// Hook para usar el socket fácilmente en cualquier componente
export function useSocket() {
  return useContext(ContextoSocket);
}
