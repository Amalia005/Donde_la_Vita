import React from 'react';
import ImagenConFallback from '../../../componentes/ImagenConFallback.jsx';
import { formatearPrecio } from '../../../utilidades/formatear.js';

function TarjetaPlato({ plato, onEditar, onEliminar, onCambiarDisponibilidad }) {
  return (
    <div className="tarjeta-plato">
      <div className="tarjeta-plato__imagen-cont">
        <ImagenConFallback src={plato.imagen} alt={plato.nombre} className="tarjeta-plato__imagen" />
      </div>

      <div className="tarjeta-plato__contenido">
        <div className="tarjeta-plato__fila-superior">
          <div className="tarjeta-plato__info">
            <h3 className="tarjeta-plato__nombre">{plato.nombre}</h3>
            {plato.descripcion && (
              <p className="tarjeta-plato__descripcion">{plato.descripcion}</p>
            )}
          </div>
          <span className="tarjeta-plato__precio">{formatearPrecio(plato.precio)}</span>
        </div>

        <div className="tarjeta-plato__controles">
          <button
            className={`toggle${plato.disponible ? ' toggle--activo' : ''}`}
            onClick={onCambiarDisponibilidad}
            role="switch"
            aria-checked={plato.disponible}
            aria-label={plato.disponible ? 'Deshabilitar plato' : 'Habilitar plato'}
          >
            <span className="toggle__thumb" />
          </button>
          <span className="tarjeta-plato__disponibilidad">
            {plato.disponible ? 'Disponible' : 'No disponible'}
          </span>

          <button className="tarjeta-plato__btn-icono" onClick={onEditar} aria-label="Editar plato">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>

          <button className="tarjeta-plato__btn-icono tarjeta-plato__btn-icono--eliminar" onClick={onEliminar} aria-label="Eliminar plato">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default TarjetaPlato;
