import React from 'react';
import ImagenConFallback from '../../../componentes/ImagenConFallback.jsx';
import { formatearPrecio } from '../../../utilidades/formatear.js';

function ElementoMenu({ plato, onClick }) {
  return (
    <button className="elemento-menu" onClick={onClick} aria-label={`Ver detalle de ${plato.nombre}`}>
      <div className="elemento-menu__imagen-cont">
        <ImagenConFallback src={plato.imagen} alt={plato.nombre} className="elemento-menu__imagen" />
      </div>
      <div className="elemento-menu__info">
        <h3 className="elemento-menu__nombre">{plato.nombre}</h3>
      </div>
      <div className="elemento-menu__precio">{formatearPrecio(plato.precio)}</div>
    </button>
  );
}

export default ElementoMenu;
