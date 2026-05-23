// App.jsx — Enrutador principal entre las 3 vistas
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProveedorSocket } from './contextos/ContextoSocket.jsx';
import Garzon from './vistas/Garzon/Garzon.jsx';
import Cocina from './vistas/Cocina/Cocina.jsx';
import Admin from './vistas/Admin/Admin.jsx';

function App() {
  return (
    <ProveedorSocket>
      <BrowserRouter>
        <Routes>
          {/* Redirige la raíz a la vista del garzón */}
          <Route path="/" element={<Navigate to="/garzon" replace />} />
          <Route path="/garzon" element={<Garzon />} />
          <Route path="/cocina" element={<Cocina />} />
          <Route path="/admin"  element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </ProveedorSocket>
  );
}

export default App;
