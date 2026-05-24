import React from 'react';

function Cabecera({ derecha, onCerrarSesion }) {
  return (
    <header className="cabecera">
      <div className="cabecera__contenido">
        <h1 className="cabecera__titulo">Donde la Vita</h1>
        <div className="cabecera__derecha">
          {derecha}
          {onCerrarSesion && (
            <button className="cabecera__btn-salir" onClick={onCerrarSesion} aria-label="Cerrar sesión">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Cabecera;