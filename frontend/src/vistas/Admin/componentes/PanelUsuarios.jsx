import React, { useState, useEffect } from 'react';
import { obtenerUsuarios, crearUsuario, editarUsuario, eliminarUsuario } from '../../../servicios/api.js';

const ROLES = ['garzon', 'cocina', 'admin'];

const VACÍO = { nombre: '', rol: 'garzon', activo: true, contrasena: '' };

function PanelUsuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [modalAbierto, setModalAbierto] = useState(false);
    const [editando, setEditando] = useState(null);
    const [form, setForm] = useState(VACÍO);

    useEffect(() => {
        obtenerUsuarios()
            .then(datos => setUsuarios(Array.isArray(datos) ? datos : []))
            .catch(() => { });
    }, []);

    const set = (campo, valor) => setForm(prev => ({ ...prev, [campo]: valor }));

    const abrirCrear = () => {
        setEditando(null);
        setForm(VACÍO);
        setModalAbierto(true);
    };

    const abrirEditar = (usuario) => {
        setEditando(usuario);
        setForm({ nombre: usuario.nombre, rol: usuario.rol, activo: usuario.activo });
        setModalAbierto(true);
    };

    const cerrar = () => {
        setModalAbierto(false);
        setEditando(null);
    };

    const guardar = async () => {
        if (!form.nombre.trim()) return;
        try {
            if (editando) {
                const actualizado = await editarUsuario(editando._id, form);
                setUsuarios(prev => prev.map(u => u._id === editando._id ? actualizado : u));
            } else {
                const nuevo = await crearUsuario(form);
                setUsuarios(prev => [nuevo, ...prev]);
            }
            cerrar();
        } catch (err) {
            console.error('Error al guardar usuario:', err);
        }
    };

    const eliminar = async (id) => {
        if (!window.confirm('¿Eliminar este usuario?')) return;
        try {
            await eliminarUsuario(id);
            setUsuarios(prev => prev.filter(u => u._id !== id));
        } catch (err) {
            console.error('Error al eliminar usuario:', err);
        }
    };

    const etiquetaRol = (rol) => {
        if (rol === 'garzon') return 'Garzón';
        if (rol === 'cocina') return 'Cocina';
        return 'Admin';
    };

    return (
        <div className="panel-usuarios">
            {usuarios.length === 0 ? (
                <p className="admin__vacio">No hay usuarios registrados</p>
            ) : (
                <div className="panel-usuarios__lista">
                    {usuarios.map(usuario => (
                        <div key={usuario._id} className="panel-usuarios__tarjeta">
                            <div className="panel-usuarios__info">
                                <span className="panel-usuarios__nombre">{usuario.nombre}</span>
                                <span className={`panel-usuarios__rol panel-usuarios__rol--${usuario.rol}`}>
                                    {etiquetaRol(usuario.rol)}
                                </span>
                                <span className={`panel-usuarios__estado ${usuario.activo ? 'panel-usuarios__estado--activo' : ''}`}>
                                    {usuario.activo ? 'Activo' : 'Inactivo'}
                                </span>
                            </div>
                            <div className="panel-usuarios__acciones">
                                <button className="tarjeta-plato__btn-icono" onClick={() => abrirEditar(usuario)} aria-label="Editar">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                    </svg>
                                </button>
                                <button className="tarjeta-plato__btn-icono tarjeta-plato__btn-icono--eliminar" onClick={() => eliminar(usuario._id)} aria-label="Eliminar">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="3 6 5 6 21 6" />
                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <button className="admin__fab" onClick={abrirCrear} aria-label="Agregar usuario">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                </svg>
            </button>

            {modalAbierto && (
                <div className="modal-usuarios__fondo" onClick={cerrar}>
                    <div className="modal-usuarios__contenido" onClick={e => e.stopPropagation()}>
                        <h2 className="modal-usuarios__titulo">
                            {editando ? 'Editar usuario' : 'Nuevo usuario'}
                        </h2>

                        <div className="modal-editar-plato__campo">
                            <label className="modal-editar-plato__label">Nombre</label>
                            <input
                                className="modal-editar-plato__input"
                                type="text"
                                value={form.nombre}
                                onChange={e => set('nombre', e.target.value)}
                                placeholder="Nombre del usuario"
                                required
                            />
                        </div>

                        <div className="modal-editar-plato__campo">
                            <label className="modal-editar-plato__label">Contraseña</label>
                            <input
                                className="modal-editar-plato__input"
                                type="text"
                                value={form.contrasena || ''}
                                onChange={e => set('contrasena', e.target.value)}
                                placeholder="Contraseña del usuario"
                                required={!editando}
                            />
                        </div>

                        <div className="modal-editar-plato__campo">
                            <label className="modal-editar-plato__label">Rol</label>
                            <select
                                className="modal-editar-plato__select"
                                value={form.rol}
                                onChange={e => set('rol', e.target.value)}
                            >
                                {ROLES.map(rol => (
                                    <option key={rol} value={rol}>{etiquetaRol(rol)}</option>
                                ))}
                            </select>
                        </div>

                        {editando && (
                            <div className="modal-editar-plato__disponibilidad">
                                <label className="modal-editar-plato__label">Activo</label>
                                <button
                                    type="button"
                                    className={`toggle${form.activo ? ' toggle--activo' : ''}`}
                                    onClick={() => set('activo', !form.activo)}
                                    role="switch"
                                    aria-checked={form.activo}
                                >
                                    <span className="toggle__thumb" />
                                </button>
                            </div>
                        )}

                        <div className="modal-usuarios__botones">
                            <button className="modal-editar-plato__btn-guardar" onClick={guardar}>
                                {editando ? 'Guardar cambios' : 'Crear usuario'}
                            </button>
                            <button className="modal-usuarios__btn-cancelar" onClick={cerrar}>
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PanelUsuarios;