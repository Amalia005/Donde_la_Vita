import React from 'react';
import ModalBase from '../../../componentes/ModalBase.jsx';
import { formatearPrecio } from '../../../utilidades/formatear.js';

function PanelPedido({ carritoItems, mesa, enviando, onCerrar, onEliminar, onAgregarNota, onEnviar, onMesaChange }) {
  const total = carritoItems.reduce((suma, item) => suma + item.plato.precio * item.cantidad, 0);

  return (
    <ModalBase onCerrar={onCerrar} etiqueta="Pedido actual">
      <div className="panel-pedido__contenedor">

        <div className="panel-pedido__cabecera">
          <h2 className="panel-pedido__titulo">Pedido Actual</h2>
          <button className="panel-pedido__btn-cerrar" onClick={onCerrar} aria-label="Cerrar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="panel-pedido__lista">
          {carritoItems.length === 0 ? (
            <p className="panel-pedido__vacio">Tu pedido está vacío</p>
          ) : (
            carritoItems.map(item => {
              const id = item.plato._id || item.plato.id;
              return (
                <div key={id} className="panel-pedido__item">
                  <div className="panel-pedido__item-info">
                    <p className="panel-pedido__item-nombre">{item.plato.nombre}</p>
                    <p className="panel-pedido__item-cantidad">Cantidad: {item.cantidad}</p>
                    {item.nota && <p className="panel-pedido__item-nota">Nota: {item.nota}</p>}
                  </div>
                  <div className="panel-pedido__item-acciones">
                    <span className="panel-pedido__item-precio">
                      ${(item.plato.precio * item.cantidad).toLocaleString('es-CL')}
                    </span>
                    <div className="panel-pedido__item-botones">
                      <button
                        className="panel-pedido__item-btn"
                        onClick={() => onAgregarNota(id)}
                        aria-label={`Agregar nota a ${item.plato.nombre}`}
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                      </button>
                      <button
                        className="panel-pedido__item-btn"
                        onClick={() => onEliminar(id)}
                        aria-label={`Eliminar ${item.plato.nombre}`}
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {carritoItems.length > 0 && (
          <div className="panel-pedido__pie">
            <div className="panel-pedido__mesa">
              <label htmlFor="mesa-panel" className="panel-pedido__mesa-etiqueta">Mesa Nº</label>
              <input
                id="mesa-panel"
                type="number"
                className="panel-pedido__mesa-input"
                value={mesa}
                onChange={e => onMesaChange(e.target.value)}
                placeholder="Ingresa el número de mesa"
                min="1"
              />
            </div>
            <div className="panel-pedido__total-fila">
              <span className="panel-pedido__total-etiqueta">Total</span>
              <span className="panel-pedido__total-valor">{formatearPrecio(total)}</span>
            </div>
            <button className="panel-pedido__btn-enviar" onClick={onEnviar} disabled={enviando}>
              {enviando ? 'Enviando…' : 'Enviar pedido a cocina'}
            </button>
          </div>
        )}
      </div>
    </ModalBase>
  );
}

export default PanelPedido;
