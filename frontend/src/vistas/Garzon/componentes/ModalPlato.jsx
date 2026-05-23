import React, { useState } from 'react';
import ImagenConFallback from '../../../componentes/ImagenConFallback.jsx';
import ModalBase from '../../../componentes/ModalBase.jsx';

function ModalPlato({ plato, onCerrar, onAgregar }) {
  const [cantidad, setCantidad] = useState(1);

  const disminuir = () => setCantidad(c => Math.max(1, c - 1));
  const aumentar  = () => setCantidad(c => c + 1);

  const handleAgregar = () => {
    onAgregar(cantidad);
    onCerrar();
  };

  const precioTotal = plato.precio === 0 ? 'Gratis' : `$${(plato.precio * cantidad).toLocaleString('es-CL')}`;

  return (
    <ModalBase onCerrar={onCerrar} etiqueta={plato.nombre}>
      <div className="modal-plato__contenedor">

        <div className="modal-plato__fila-cerrar">
          <button className="modal-plato__btn-cerrar" onClick={onCerrar} aria-label="Cerrar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="modal-plato__cuerpo">
          <div className="modal-plato__imagen-cont">
            <ImagenConFallback src={plato.imagen} alt={plato.nombre} className="modal-plato__imagen" />
          </div>

          <h2 className="modal-plato__nombre">{plato.nombre}</h2>
          {plato.descripcion && <p className="modal-plato__descripcion">{plato.descripcion}</p>}

          {plato.ingredientes?.length > 0 && (
            <>
              <p className="modal-plato__ing-titulo">Ingredientes:</p>
              <ul className="modal-plato__ing-lista">
                {plato.ingredientes.map((ing, i) => (
                  <li key={i} className="modal-plato__ing-item">{ing}</li>
                ))}
              </ul>
            </>
          )}

          <div className="modal-plato__cantidad-fila">
            <span className="modal-plato__cantidad-etiqueta">Cantidad:</span>
            <div className="modal-plato__cantidad-controles">
              <button className="modal-plato__cantidad-btn" onClick={disminuir} aria-label="Disminuir cantidad">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </button>
              <span className="modal-plato__cantidad-numero">{cantidad}</span>
              <button className="modal-plato__cantidad-btn" onClick={aumentar} aria-label="Aumentar cantidad">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </button>
            </div>
          </div>

          <button className="modal-plato__btn-agregar" onClick={handleAgregar}>
            Agregar — {precioTotal}
          </button>
        </div>
      </div>
    </ModalBase>
  );
}

export default ModalPlato;
