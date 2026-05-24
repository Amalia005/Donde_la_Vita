import React, { useState } from 'react';
import ModalBase from '../../../componentes/ModalBase.jsx';

const CATEGORIAS = [
  { valor: 'Menús del día', etiqueta: 'Menú del día' },
  { valor: 'Platos de fondo', etiqueta: 'Platos de fondo' },
  { valor: 'Agregados', etiqueta: 'Agregados' },
  { valor: 'Bebestibles', etiqueta: 'Bebestibles' },
];

const VACÍO = {
  nombre: '',
  descripcion: '',
  precio: 0,
  categoria: 'Menús del día',
  imagen: '',
  ingredientes: [],
  disponible: true,
};

function ModalEditarPlato({ plato, onCerrar, onGuardar, onEliminar }) {
  const [form, setForm] = useState(plato ?? VACÍO);
  const [archivo, setArchivo] = useState(null);
  const esEdicion = Boolean(plato);

  const urlPreview = archivo
    ? URL.createObjectURL(archivo)
    : form.imagen
      ? (form.imagen.startsWith('/') ? `http://localhost:3001${form.imagen}` : form.imagen)
      : null;

  const set = (campo, valor) => setForm(prev => ({ ...prev, [campo]: valor }));

  const handleGuardar = (e) => {
    e.preventDefault();
    const datosFinales = { ...form };
    if (datosFinales.ingredientesTexto != null) {
      datosFinales.ingredientes = datosFinales.ingredientesTexto
        .split(',')
        .map(i => i.trim())
        .filter(i => i);
      delete datosFinales.ingredientesTexto;
    }
    onGuardar(datosFinales, archivo);
  };

  const handleEliminar = () => {
    if (window.confirm(`¿Eliminar "${form.nombre}"?`)) onEliminar();
  };

  return (
    <ModalBase onCerrar={onCerrar} etiqueta={esEdicion ? 'Editar plato' : 'Nuevo plato'}>
      <div className="modal-editar-plato__contenedor">
        <div className="modal-editar-plato__cabecera">
          <h2 className="modal-editar-plato__titulo">
            {esEdicion ? 'Editar plato' : 'Nuevo plato'}
          </h2>
          <button className="modal-editar-plato__btn-cerrar" onClick={onCerrar} aria-label="Cerrar">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <form className="modal-editar-plato__form" onSubmit={handleGuardar}>
          <div className="modal-editar-plato__campo">
            <label className="modal-editar-plato__label">Nombre del plato</label>
            <input
              className="modal-editar-plato__input"
              type="text"
              value={form.nombre}
              onChange={e => set('nombre', e.target.value)}
              placeholder="Ej: Cazuela de vacuno"
              required
            />
          </div>

          <div className="modal-editar-plato__campo">
            <label className="modal-editar-plato__label">Descripción</label>
            <textarea
              className="modal-editar-plato__textarea"
              value={form.descripcion}
              onChange={e => set('descripcion', e.target.value)}
              placeholder="Describe el plato brevemente"
              rows={3}
            />
          </div>

          <div className="modal-editar-plato__campo">
            <label className="modal-editar-plato__label">Ingredientes</label>
            <input
              className="modal-editar-plato__input"
              type="text"
              value={form.ingredientesTexto ?? (form.ingredientes || []).join(', ')}
              onChange={e => set('ingredientesTexto', e.target.value)}
              placeholder="Ej: Porotos, Rienda, Huevo"
            />
            <span className="modal-editar-plato__ayuda">Separa cada ingrediente con una coma</span>
          </div>

          <div className="modal-editar-plato__campo">
            <label className="modal-editar-plato__label">Categoría</label>
            <select
              className="modal-editar-plato__select"
              value={form.categoria}
              onChange={e => set('categoria', e.target.value)}
            >
              {CATEGORIAS.map(cat => (
                <option key={cat.valor} value={cat.valor}>{cat.etiqueta}</option>
              ))}
            </select>
          </div>

          <div className="modal-editar-plato__campo">
            <label className="modal-editar-plato__label">Precio (CLP)</label>
            <input
              className="modal-editar-plato__input"
              type="number"
              value={form.precio === 0 ? '' : form.precio}
              onChange={e => set('precio', e.target.value === '' ? 0 : Number(e.target.value))}
              min="0"
              placeholder="0"
              required
            />
          </div>

          <div className="modal-editar-plato__campo">
            <label className="modal-editar-plato__label">Imagen</label>
            <label className="modal-editar-plato__zona-imagen" htmlFor="input-imagen-plato">
              {urlPreview ? (
                <img src={urlPreview} alt="preview" className="modal-editar-plato__preview" />
              ) : (
                <span className="modal-editar-plato__zona-texto">Toca para seleccionar imagen</span>
              )}
            </label>
            <input
              id="input-imagen-plato"
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              className="modal-editar-plato__input-archivo"
              onChange={e => setArchivo(e.target.files[0] || null)}
            />
          </div>

          <div className="modal-editar-plato__disponibilidad">
            <label className="modal-editar-plato__label">Disponible</label>
            <button
              type="button"
              className={`toggle${form.disponible ? ' toggle--activo' : ''}`}
              onClick={() => set('disponible', !form.disponible)}
              role="switch"
              aria-checked={form.disponible}
            >
              <span className="toggle__thumb" />
            </button>
          </div>

          <button type="submit" className="modal-editar-plato__btn-guardar">
            {esEdicion ? 'Guardar cambios' : 'Crear plato'}
          </button>

          {esEdicion && (
            <button
              type="button"
              className="modal-editar-plato__btn-eliminar"
              onClick={handleEliminar}
            >
              Eliminar plato
            </button>
          )}
        </form>
      </div>
    </ModalBase>
  );
}

export default ModalEditarPlato;
