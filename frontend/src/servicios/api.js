// servicios/api.js — Capa de comunicación con el backend REST
const BASE = 'http://localhost:3001/api';

// ── Helpers ────────────────────────────────────────────────────────────────

const jsonPost = (url, datos) =>
  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  }).then(r => r.json());

const jsonPut = (url, datos) =>
  fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  }).then(r => r.json());

// ── Platos ─────────────────────────────────────────────────────────────────

/** Obtener todos los platos. Filtros opcionales: { categoria, disponible } */
export const obtenerPlatos = (filtros = {}) => {
  const params = new URLSearchParams(filtros).toString();
  return fetch(`${BASE}/platos${params ? '?' + params : ''}`).then(r => r.json());
};

export const obtenerPlatoPorId = (id) =>
  fetch(`${BASE}/platos/${id}`).then(r => r.json());

const construirFormData = (datos, archivo) => {
  const fd = new FormData();
  Object.entries(datos).forEach(([k, v]) => {
    if (v == null) return;
    if (Array.isArray(v)) fd.append(k, JSON.stringify(v));
    else fd.append(k, v);
  });
  if (archivo) fd.append('imagen', archivo);
  return fd;
};

export const crearPlato = (datos, archivo) =>
  fetch(`${BASE}/platos`, { method: 'POST', body: construirFormData(datos, archivo) }).then(r => r.json());

export const editarPlato = (id, datos, archivo) =>
  fetch(`${BASE}/platos/${id}`, { method: 'PUT', body: construirFormData(datos, archivo) }).then(r => r.json());

export const cambiarDisponibilidadPlato = (id) =>
  fetch(`${BASE}/platos/${id}/disponibilidad`, { method: 'PATCH' }).then(r => r.json());

export const eliminarPlato = (id) =>
  fetch(`${BASE}/platos/${id}`, { method: 'DELETE' }).then(r => r.json());

// ── Pedidos ────────────────────────────────────────────────────────────────

/** Obtener pedidos. Filtro opcional: { estado: 'pendiente' | 'en preparación' | ... } */
export const obtenerPedidos = (filtros = {}) => {
  const params = new URLSearchParams(filtros).toString();
  return fetch(`${BASE}/pedidos${params ? '?' + params : ''}`).then(r => r.json());
};

export const obtenerPedidoPorId = (id) =>
  fetch(`${BASE}/pedidos/${id}`).then(r => r.json());

export const crearPedido = (datos) =>
  jsonPost(`${BASE}/pedidos`, datos);

export const actualizarEstadoPedido = (id, estado) =>
  fetch(`${BASE}/pedidos/${id}/estado`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ estado }),
  }).then(r => r.json());

// ── Usuarios ───────────────────────────────────────────────────────────────

export const obtenerUsuarios = () =>
  fetch(`${BASE}/usuarios`).then(r => r.json());

export const crearUsuario = (datos) =>
  jsonPost(`${BASE}/usuarios`, datos);

export const editarUsuario = (id, datos) =>
  jsonPut(`${BASE}/usuarios/${id}`, datos);

export const eliminarUsuario = (id) =>
  fetch(`${BASE}/usuarios/${id}`, { method: 'DELETE' }).then(r => r.json());

export const loginUsuario = (nombre, contrasena) =>
  fetch(`${BASE}/usuarios/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, contrasena }),
  }).then(r => {
    if (!r.ok) throw new Error('Credenciales inválidas');
    return r.json();
  });