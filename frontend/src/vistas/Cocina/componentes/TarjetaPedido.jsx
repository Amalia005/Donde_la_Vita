import React, { useState, useEffect } from 'react';
import { formatearMinutos } from '../../../utilidades/formatear.js';

function TarjetaPedido({ pedido, textoBoton, onAccion }) {
  const [minutosTranscurridos, setMinutosTranscurridos] = useState(0);

  useEffect(() => {
    const calcular = () => {
      const diff = Math.floor((Date.now() - new Date(pedido.creadoEn).getTime()) / 60000);
      setMinutosTranscurridos(diff);
    };
    calcular();
    const intervalo = setInterval(calcular, 30000);
    return () => clearInterval(intervalo);
  }, [pedido.creadoEn]);

  const colorTiempo =
    minutosTranscurridos > 20 ? 'tarjeta-pedido__tiempo--rojo'
    : minutosTranscurridos > 10 ? 'tarjeta-pedido__tiempo--naranja'
    : 'tarjeta-pedido__tiempo--verde';

  const hora = new Date(pedido.creadoEn).toLocaleTimeString('es-CL', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className={`tarjeta-pedido${pedido.estado === 'listo' ? ' tarjeta-pedido--lista' : ''}`}>
      <div className="tarjeta-pedido__cabecera">
        <span className="tarjeta-pedido__mesa">Mesa {pedido.mesa}</span>
        <span className="tarjeta-pedido__hora">{hora}</span>
      </div>

      <ul className="tarjeta-pedido__platos">
        {pedido.platos.map((item, i) => {
          const nombre = item.plato?.nombre ?? `Plato #${i + 1}`;
          return (
            <li key={i} className="tarjeta-pedido__plato">
              <span className="tarjeta-pedido__cantidad">{item.cantidad}×</span>
              {nombre}
              {item.comentario && (
                <span className="tarjeta-pedido__comentario"> — {item.comentario}</span>
              )}
            </li>
          );
        })}
      </ul>

      <div className={`tarjeta-pedido__tiempo ${colorTiempo}`}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
        {formatearMinutos(minutosTranscurridos)}
      </div>

      <button className="tarjeta-pedido__btn" onClick={() => onAccion(pedido._id)}>
        {textoBoton}
      </button>
    </div>
  );
}

export default TarjetaPedido;
