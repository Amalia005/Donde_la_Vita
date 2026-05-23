import React from 'react';
import TarjetaPedido from './TarjetaPedido.jsx';

function ColumnaKanban({ titulo, pedidos, textoBoton, onAccion }) {
  return (
    <div className="columna-kanban">
      <div className="columna-kanban__cabecera">
        <h2 className="columna-kanban__titulo">{titulo}</h2>
        <span className="columna-kanban__conteo">
          {pedidos.length} pedido{pedidos.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="columna-kanban__lista">
        {pedidos.length === 0 ? (
          <p className="columna-kanban__vacio">Sin pedidos</p>
        ) : (
          pedidos.map(pedido => (
            <TarjetaPedido
              key={pedido._id}
              pedido={pedido}
              textoBoton={textoBoton}
              onAccion={onAccion}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default ColumnaKanban;
