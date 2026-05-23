export const formatearPrecio = (precio) =>
  precio === 0 ? 'Incluido' : `$${precio.toLocaleString('es-CL')}`;

export const formatearMinutos = (minutos) =>
  minutos === 1 ? 'Hace 1 min' : `Hace ${minutos} min`;
