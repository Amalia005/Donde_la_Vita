// componentes/ImagenConFallback.jsx
// Imagen con placeholder cuando la URL falla o no existe
import React, { useState } from 'react';

function ImagenConFallback({ src, alt, className, style }) {
  const [error, setError] = useState(false);
  const [cargando, setCargando] = useState(true);

  // Si no hay src o hubo error, mostrar placeholder con emoji
  if (error || !src) {
    return (
      <div
        className={className}
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#e5d5c0',
          color: '#a0896e',
          fontSize: '2rem',
          ...style,
        }}
        aria-label={alt}
      >
        🍽️
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={{
        opacity: cargando ? 0 : 1,
        transition: 'opacity 200ms ease',
        ...style,
      }}
      onLoad={() => setCargando(false)}
      onError={() => setError(true)}
    />
  );
}

export default ImagenConFallback;
