import React, { useState } from 'react';
import ModalBase from '../../../componentes/ModalBase.jsx';

const CATEGORIAS = [
  { valor: 'Menús del día',   etiqueta: 'Menú del día' },
  { valor: 'Platos de fondo', etiqueta: 'Platos de fondo' },
  { valor: 'Agregados',       etiqueta: 'Agregados' },
  { valor: 'Bebestibles',     etiqueta: 'Bebestibles' },
];

const VACÍO = {
  nombre: '',
  descripcion: '',
  precio: 0,
  categoria: 'Menús del día',
  imagen: '',
  disponible: true,
};

function ModalEditarPlato({ plato, onCerrar, onGuardar, onEliminar }) {
  const [form, setForm] = useState(plato ?? VACÍO);
  const esEdicion = Boolean(plato);

  const set = (campo, valor) => setForm(prev => ({ ...prev, [campo]: valor }));

  const handleGuardar = (e) => {
    e.preventDefault();
    onGuardar(form);
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
              value={form.precio}
              onChange={e => set('precio', Number(e.target.value))}
              min="0"
              placeholder="0"
              required
            />
          </div>

          <div className="modal-editar-plato__campo">
            <label className="modal-editar-plato__label">URL de imagen</label>
            <input
              className="modal-editar-plato__input"
              type="text"
              value={form.imagen}
              onChange={e => set('imagen', e.target.value)}
              placeholder="https://..."
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
