import React, { useState, useEffect } from 'react';
import { useSocket } from '../../contextos/ContextoSocket.jsx';
import {
  obtenerPlatos, crearPlato, editarPlato,
  cambiarDisponibilidadPlato, eliminarPlato,
} from '../../servicios/api.js';
import Cabecera from '../../componentes/Cabecera.jsx';
import BarraSecciones from '../../componentes/BarraSecciones.jsx';
import TarjetaPlato from './componentes/TarjetaPlato.jsx';
import ModalEditarPlato from './componentes/ModalEditarPlato.jsx';
import './Admin.css';

const CATEGORIAS = ['Menús del día', 'Platos de fondo', 'Agregados', 'Bebestibles'];

function Admin() {
  const { socket } = useSocket();
  const [platos, setPlatos] = useState([]);
  const [categoriaActiva, setCategoriaActiva] = useState(CATEGORIAS[0]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [platoEditando, setPlatoEditando] = useState(null);

  useEffect(() => {
    obtenerPlatos()
      .then(datos => setPlatos(Array.isArray(datos) ? datos : []))
      .catch(() => {});
  }, []);

  const abrirCrear = () => {
    setPlatoEditando(null);
    setModalAbierto(true);
  };

  const abrirEditar = (plato) => {
    setPlatoEditando(plato);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setPlatoEditando(null);
  };

  const emitirCarta = () => socket?.emit('carta-actualizada');

  const handleGuardar = async (datos) => {
    try {
      if (platoEditando) {
        const actualizado = await editarPlato(platoEditando._id, datos);
        setPlatos(prev => prev.map(p => p._id === platoEditando._id ? actualizado : p));
      } else {
        const nuevo = await crearPlato(datos);
        setPlatos(prev => [...prev, nuevo]);
      }
      emitirCarta();
      cerrarModal();
    } catch (err) {
      console.error('Error al guardar plato:', err);
    }
  };

  const handleEliminar = async () => {
    if (!platoEditando) return;
    try {
      await eliminarPlato(platoEditando._id);
      setPlatos(prev => prev.filter(p => p._id !== platoEditando._id));
      emitirCarta();
      cerrarModal();
    } catch (err) {
      console.error('Error al eliminar plato:', err);
    }
  };

  const handleDisponibilidad = async (plato) => {
    try {
      const actualizado = await cambiarDisponibilidadPlato(plato._id);
      setPlatos(prev => prev.map(p => p._id === plato._id ? actualizado : p));
      emitirCarta();
    } catch (err) {
      console.error('Error al cambiar disponibilidad:', err);
    }
  };

  const platosFiltrados = platos.filter(p => p.categoria === categoriaActiva);

  return (
    <div className="admin">
      <Cabecera />
      <BarraSecciones
        secciones={CATEGORIAS}
        seccionActiva={categoriaActiva}
        onClickSeccion={setCategoriaActiva}
        elevada
      />

      <main className="admin__contenido">
        {platosFiltrados.length === 0 ? (
          <p className="admin__vacio">No hay platos en esta categoría</p>
        ) : (
          <div className="admin__lista">
            {platosFiltrados.map(plato => (
              <TarjetaPlato
                key={plato._id}
                plato={plato}
                onEditar={() => abrirEditar(plato)}
                onEliminar={() => {
                  setPlatoEditando(plato);
                  handleEliminar();
                }}
                onCambiarDisponibilidad={() => handleDisponibilidad(plato)}
              />
            ))}
          </div>
        )}
      </main>

      <button className="admin__fab" onClick={abrirCrear} aria-label="Agregar plato">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>

      {modalAbierto && (
        <ModalEditarPlato
          plato={platoEditando}
          onCerrar={cerrarModal}
          onGuardar={handleGuardar}
          onEliminar={handleEliminar}
        />
      )}
    </div>
  );
}

export default Admin;
