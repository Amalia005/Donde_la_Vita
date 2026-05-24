import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUsuario } from '../../servicios/api.js';
import './Login.css';

function Login({ onLogin }) {
    const [nombre, setNombre] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [error, setError] = useState('');
    const [cargando, setCargando] = useState(false);
    const navegar = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setCargando(true);
        try {
            const usuario = await loginUsuario(nombre, contrasena);
            onLogin(usuario);
            if (usuario.rol === 'garzon') navegar('/garzon');
            else if (usuario.rol === 'cocina') navegar('/cocina');
            else if (usuario.rol === 'admin') navegar('/admin');
        } catch (err) {
            setError('Nombre o contraseña incorrectos');
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="login">
            <div className="login__tarjeta">
                <h1 className="login__titulo">Donde la Vita</h1>
                <p className="login__subtitulo">Ingresa tus credenciales</p>

                <form className="login__form" onSubmit={handleSubmit}>
                    <div className="login__campo">
                        <label className="login__label">Nombre</label>
                        <input
                            className="login__input"
                            type="text"
                            value={nombre}
                            onChange={e => setNombre(e.target.value)}
                            placeholder="Tu nombre"
                            required
                        />
                    </div>

                    <div className="login__campo">
                        <label className="login__label">Contraseña</label>
                        <input
                            className="login__input"
                            type="password"
                            value={contrasena}
                            onChange={e => setContrasena(e.target.value)}
                            placeholder="Tu contraseña"
                            required
                        />
                    </div>

                    {error && <p className="login__error">{error}</p>}

                    <button className="login__boton" type="submit" disabled={cargando}>
                        {cargando ? 'Ingresando...' : 'Ingresar'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;