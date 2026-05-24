import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProveedorSocket } from './contextos/ContextoSocket.jsx';
import Login from './vistas/Login/Login.jsx';
import Garzon from './vistas/Garzon/Garzon.jsx';
import Cocina from './vistas/Cocina/Cocina.jsx';
import Admin from './vistas/Admin/Admin.jsx';

function App() {
  const [usuario, setUsuario] = useState(null);

  const cerrarSesion = () => setUsuario(null);

  const rutaInicio = usuario
    ? `/${usuario.rol === 'garzon' ? 'garzon' : usuario.rol}`
    : '/login';

  return (
    <BrowserRouter>
      <ProveedorSocket>
        <Routes>
          <Route path="/login" element={
            usuario
              ? <Navigate to={rutaInicio} />
              : <Login onLogin={setUsuario} />
          } />
          <Route path="/garzon" element={
            usuario?.rol === 'garzon'
              ? <Garzon onCerrarSesion={cerrarSesion} />
              : <Navigate to="/login" />
          } />
          <Route path="/cocina" element={
            usuario?.rol === 'cocina'
              ? <Cocina onCerrarSesion={cerrarSesion} />
              : <Navigate to="/login" />
          } />
          <Route path="/admin" element={
            usuario?.rol === 'admin'
              ? <Admin onCerrarSesion={cerrarSesion} />
              : <Navigate to="/login" />
          } />
          <Route path="*" element={<Navigate to={rutaInicio} />} />
        </Routes>
      </ProveedorSocket>
    </BrowserRouter>
  );
}

export default App;