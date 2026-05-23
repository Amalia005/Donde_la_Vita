import React from 'react';

function BarraSecciones({ secciones, seccionActiva, onClickSeccion, elevada = false }) {
  return (
    <nav
      className={`barra-secciones${elevada ? ' barra-secciones--elevada' : ''}`}
      aria-label="Categorías"
    >
      <div className="barra-secciones__lista">
        {secciones.map(seccion => (
          <button
            key={seccion}
            onClick={() => onClickSeccion(seccion)}
            className={`barra-secciones__boton${seccionActiva === seccion ? ' barra-secciones__boton--activo' : ''}`}
            aria-current={seccionActiva === seccion ? 'true' : undefined}
          >
            {seccion}
          </button>
        ))}
      </div>
    </nav>
  );
}

export default BarraSecciones;