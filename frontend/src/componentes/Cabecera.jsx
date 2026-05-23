import React from 'react';

function Cabecera({ derecha }) {
  return (
    <header className="cabecera">
      <div className="cabecera__contenido">
        <h1 className="cabecera__titulo">Donde la Vita</h1>
        {derecha && <div className="cabecera__derecha">{derecha}</div>}
      </div>
    </header>
  );
}

export default Cabecera;