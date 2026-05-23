import React, { useState } from 'react';
import ModalBase from '../../../componentes/ModalBase.jsx';

const MAX_CHARS = 150;

function ModalNota({ notaActual, nombrePlato, onCerrar, onGuardar }) {
  const [nota, setNota] = useState(notaActual || '');

  const handleGuardar = () => {
    onGuardar(nota);
    onCerrar();
  };

  return (
    <ModalBase onCerrar={onCerrar} etiqueta="Nota para el chef" centrado>
      <div className="modal-nota__contenedor">
        <div className="modal-nota__cabecera">
          <h3 className="modal-nota__titulo">Nota para el chef</h3>
          <button className="modal-nota__btn-cerrar" onClick={onCerrar} aria-label="Cerrar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <p className="modal-nota__plato">{nombrePlato}</p>

        <textarea
          className="modal-nota__textarea"
          value={nota}
          onChange={e => setNota(e.target.value.slice(0, MAX_CHARS))}
          placeholder="Ej: Sin cebolla, bien cocido, etc."
          rows={4}
          aria-label="Nota para el chef"
          autoFocus
        />

        <p className="modal-nota__contador">{nota.length}/{MAX_CHARS}</p>

        <button className="modal-nota__btn-guardar" onClick={handleGuardar}>
          Guardar nota
        </button>
      </div>
    </ModalBase>
  );
}

export default ModalNota;