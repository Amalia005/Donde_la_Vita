const BASE = 'http://localhost:3001/api';

// --- Platos ---
export const obtenerPlatos = (filtros = {}) => {
  const params = new URLSearchParams(filtros).toString();
  return fetch(`${BASE}/platos${params ? '?' + params : ''}`).then(r => r.json());
};

export const obtenerPlatoPorId = (id) =>
  fetch(`${BASE}/platos/${id}`).then(r => r.json());

export const crearPlato = (datos) =>
  fetch(`${BASE}/platos`, { method: 'POST', body: datos }).then(r => r.json());

export const editarPlato = (id, datos) =>
  fetch(`${BASE}/platos/${id}`, { method: 'PUT', body: datos }).then(r => r.json());

export const cambiarDisponibilidadPlato = (id) =>
  fetch(`${BASE}/platos/${id}/disponibilidad`, { method: 'PATCH' }).then(r => r.json());

export const eliminarPlato = (id) =>
  fetch(`${BASE}/platos/${id}`, { method: 'DELETE' }).then(r => r.json());

// --- Pedidos ---
export const obtenerPedidos = (filtros = {}) => {
  const params = new URLSearchParams(filtros).toString();
  return fetch(`${BASE}/pedidos${params ? '?' + params : ''}`).then(r => r.json());
};

export const crearPedido = (datos) =>
  fetch(`${BASE}/pedidos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos)
  }).then(r => r.json());

export const actualizarEstadoPedido = (id, estado) =>
  fetch(`${BASE}/pedidos/${id}/estado`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ estado })
  }).then(r => r.json());

// --- Usuarios ---
export const obtenerUsuarios = () =>
  fetch(`${BASE}/usuarios`).then(r => r.json());

export const crearUsuario = (datos) =>
  fetch(`${BASE}/usuarios`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos)
  }).then(r => r.json());

export const editarUsuario = (id, datos) =>
  fetch(`${BASE}/usuarios/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos)
  }).then(r => r.json());

export const eliminarUsuario = (id) =>
  fetch(`${BASE}/usuarios/${id}`, { method: 'DELETE' }).then(r => r.json());
