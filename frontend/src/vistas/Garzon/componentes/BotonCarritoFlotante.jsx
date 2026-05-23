// vistas/Garzon/componentes/BotonCarritoFlotante.jsx
import React from 'react';

function BotonCarritoFlotante({ totalItems, onClick }) {
  if (totalItems === 0) return null;

  return (
    <button
      className="boton-carrito"
      onClick={onClick}
      aria-label={`Ver pedido (${totalItems} ítem${totalItems !== 1 ? 's' : ''})`}
    >
      {/* Icono carrito */}
      <svg className="boton-carrito__icono" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9"  cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>

      {/* Badge con el total de ítems */}
      <span className="boton-carrito__badge" aria-hidden="true">{totalItems}</span>
    </button>
  );
}

export default BotonCarritoFlotante;
