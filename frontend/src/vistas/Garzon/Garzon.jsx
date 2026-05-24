import React, { useState, useEffect } from 'react';
import { useSocket } from '../../contextos/ContextoSocket.jsx';
import { obtenerPlatos, crearPedido } from '../../servicios/api.js';
import { menuData } from '../../datos/menuData.js';
import CabeceraMenu from './componentes/CabeceraMenu.jsx';
import BarraSecciones from '../../componentes/BarraSecciones.jsx';
import ElementoMenu from './componentes/ElementoMenu.jsx';
import ModalPlato from './componentes/ModalPlato.jsx';
import PanelPedido from './componentes/PanelPedido.jsx';
import BotonCarritoFlotante from './componentes/BotonCarritoFlotante.jsx';
import ModalNota from './componentes/ModalNota.jsx';
import './Garzon.css';

const CATEGORIAS = ['Menús del día', 'Platos de fondo', 'Agregados', 'Bebestibles'];

function Garzon({ onCerrarSesion }) {
  const { socket } = useSocket();
  const [platos, setPlatos] = useState([]);
  const [categoriaActiva, setCategoriaActiva] = useState(CATEGORIAS[0]);
  const [platoSeleccionado, setPlatoSeleccionado] = useState(null);
  const [carrito, setCarrito] = useState([]);
  const [panelAbierto, setPanelAbierto] = useState(false);
  const [mesa, setMesa] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [notificacion, setNotificacion] = useState(null);
  const [itemNotaId, setItemNotaId] = useState(null);
  const [cabeceraVisible, setCabeceraVisible] = useState(true);

  useEffect(() => {
    obtenerPlatos({ disponible: true })
      .then(datos => setPlatos(Array.isArray(datos) ? datos : menuData))
      .catch(() => setPlatos(menuData));
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.on('pedido-listo', ({ mesa: numMesa }) => {
      setNotificacion(numMesa);
      setTimeout(() => setNotificacion(null), 6000);
    });
    socket.on('carta-actualizada', () => {
      obtenerPlatos({ disponible: true })
        .then(datos => setPlatos(Array.isArray(datos) ? datos : menuData))
        .catch(() => { });
    });
    return () => {
      socket.off('pedido-listo');
      socket.off('carta-actualizada');
    };
  }, [socket]);

  const platosFiltrados = platos.filter(p => p.categoria === categoriaActiva);

  const agregarAlCarrito = (plato, cantidad) => {
    const id = plato._id || plato.id;
    setCarrito(prev => {
      const existe = prev.find(item => (item.plato._id || item.plato.id) === id);
      if (existe) {
        return prev.map(item =>
          (item.plato._id || item.plato.id) === id
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      }
      return [...prev, { plato, cantidad, nota: '' }];
    });
  };

  const eliminarDelCarrito = (platoId) =>
    setCarrito(prev => prev.filter(item => (item.plato._id || item.plato.id) !== platoId));

  const actualizarNota = (platoId, nota) =>
    setCarrito(prev =>
      prev.map(item =>
        (item.plato._id || item.plato.id) === platoId ? { ...item, nota } : item
      )
    );

  const enviarPedido = async () => {
    if (!mesa || carrito.length === 0) return;
    setEnviando(true);
    try {
      await crearPedido({
        mesa: Number(mesa),
        platos: carrito.map(item => ({
          plato: item.plato._id || item.plato.id,
          cantidad: item.cantidad,
          comentario: item.nota,
        })),
      });
      setCarrito([]);
      setMesa('');
      setPanelAbierto(false);
    } catch (err) {
      console.error('Error al enviar pedido:', err);
    } finally {
      setEnviando(false);
    }
  };

  const totalItems = carrito.reduce((s, i) => s + i.cantidad, 0);
  const itemNota = carrito.find(item => (item.plato._id || item.plato.id) === itemNotaId);

  return (
    <div className="garzon">
      <div className="vista-contenido">
        <CabeceraMenu visible={cabeceraVisible} mesa={mesa} onMesaChange={setMesa} onCerrarSesion={onCerrarSesion} />
        <BarraSecciones
          secciones={CATEGORIAS}
          seccionActiva={categoriaActiva}
          onClickSeccion={setCategoriaActiva}
          elevada
        />
      </div>
      <main className="garzon__contenido vista-contenido">
        {platosFiltrados.length === 0 ? (
          <p className="garzon__vacio">No hay platos disponibles en esta categoría</p>
        ) : (
          <div className="garzon__cuadricula">
            {platosFiltrados.map(plato => (
              <ElementoMenu
                key={plato._id || plato.id}
                plato={plato}
                onClick={() => setPlatoSeleccionado(plato)}
              />
            ))}
          </div>
        )}
      </main>

      <BotonCarritoFlotante totalItems={totalItems} onClick={() => setPanelAbierto(true)} />

      {platoSeleccionado && (
        <ModalPlato
          plato={platoSeleccionado}
          onCerrar={() => setPlatoSeleccionado(null)}
          onAgregar={(cantidad) => agregarAlCarrito(platoSeleccionado, cantidad)}
        />
      )}

      {panelAbierto && (
        <PanelPedido
          carritoItems={carrito}
          mesa={mesa}
          enviando={enviando}
          onCerrar={() => setPanelAbierto(false)}
          onEliminar={eliminarDelCarrito}
          onAgregarNota={setItemNotaId}
          onEnviar={enviarPedido}
          onMesaChange={setMesa}
        />
      )}

      {itemNotaId && itemNota && (
        <ModalNota
          notaActual={itemNota.nota}
          nombrePlato={itemNota.plato.nombre}
          onCerrar={() => setItemNotaId(null)}
          onGuardar={(nota) => {
            actualizarNota(itemNotaId, nota);
            setItemNotaId(null);
          }}
        />
      )}

      {notificacion && (
        <div className="garzon__notificacion" role="alert">
          ¡Mesa {notificacion} — pedido listo!
        </div>
      )}
    </div>
  );
}

export default Garzon;
