import React, { useState, useEffect } from 'react';
import { useSocket } from '../../contextos/ContextoSocket.jsx';
import { obtenerPedidos, actualizarEstadoPedido } from '../../servicios/api.js';
import Cabecera from '../../componentes/Cabecera.jsx';
import ColumnaKanban from './componentes/ColumnaKanban.jsx';
import './Cocina.css';

function Cocina() {
  const { socket } = useSocket();
  const [pedidos, setPedidos] = useState([]);

  const cargarPedidos = () => {
    obtenerPedidos()
      .then(datos => setPedidos(Array.isArray(datos) ? datos : []))
      .catch(() => {});
  };

  useEffect(() => {
    cargarPedidos();
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on('nuevo-pedido', (pedido) => {
      setPedidos(prev => [pedido, ...prev]);
    });

    socket.on('pedido-actualizado', (pedidoActualizado) => {
      setPedidos(prev =>
        prev.map(p => p._id === pedidoActualizado._id ? pedidoActualizado : p)
      );
    });

    return () => {
      socket.off('nuevo-pedido');
      socket.off('pedido-actualizado');
    };
  }, [socket]);

  const cambiarEstado = async (pedidoId, nuevoEstado) => {
    try {
      const actualizado = await actualizarEstadoPedido(pedidoId, nuevoEstado);
      setPedidos(prev => prev.map(p => p._id === pedidoId ? actualizado : p));
    } catch (err) {
      console.error('Error al cambiar estado:', err);
    }
  };

  const pendientes    = pedidos.filter(p => p.estado === 'pendiente');
  const enPreparacion = pedidos.filter(p => p.estado === 'en preparación');
  const listos        = pedidos.filter(p => p.estado === 'listo');

  return (
    <div className="cocina">
      <Cabecera />

      <div className="cocina__tablero">
        <ColumnaKanban
          titulo="Pendientes"
          pedidos={pendientes}
          textoBoton="Iniciar preparación"
          onAccion={(id) => cambiarEstado(id, 'en preparación')}
        />
        <ColumnaKanban
          titulo="En preparación"
          pedidos={enPreparacion}
          textoBoton="Marcar como listo"
          onAccion={(id) => cambiarEstado(id, 'listo')}
        />
        <ColumnaKanban
          titulo="Listos"
          pedidos={listos}
          textoBoton="Entregado"
          onAccion={(id) => cambiarEstado(id, 'entregado')}
        />
      </div>
    </div>
  );
}

export default Cocina;
