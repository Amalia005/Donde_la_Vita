import React from 'react';

function ModalBase({ onCerrar, etiqueta, centrado = false, children }) {
  const handleFondo = e => {
    if (e.target === e.currentTarget) onCerrar();
  };

  return (
    <div
      className={`modal-base__fondo${centrado ? ' modal-base__fondo--centrado' : ''}`}
      onClick={handleFondo}
      role="dialog"
      aria-modal="true"
      aria-label={etiqueta}
    >
      {children}
    </div>
  );
}

export default ModalBase;