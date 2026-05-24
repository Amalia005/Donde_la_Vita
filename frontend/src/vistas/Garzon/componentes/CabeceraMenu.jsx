import React from 'react';
import Cabecera from '../../../componentes/Cabecera.jsx';

function CabeceraMenu({ visible, mesa, onMesaChange, onCerrarSesion }) {
  const inputMesa = (
    <div className="cabecera-menu__mesa">
      <label htmlFor="numero-mesa" className="cabecera-menu__mesa-etiqueta">Mesa</label>
      <input
        id="numero-mesa"
        type="number"
        className="cabecera-menu__mesa-campo"
        value={mesa}
        onChange={e => onMesaChange(e.target.value)}
        placeholder="Nº"
        min="1"
        aria-label="Número de mesa"
      />
    </div>
  );

  return (
    <div className={`cabecera-menu${visible ? '' : ' cabecera-menu--oculta'}`}>
      <Cabecera derecha={inputMesa} onCerrarSesion={onCerrarSesion} />
    </div>
  );
}

export default CabeceraMenu;