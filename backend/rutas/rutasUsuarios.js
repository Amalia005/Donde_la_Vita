const express = require('express');
const router = express.Router();
const Usuario = require('../modelos/Usuario');
const { obtenerUsuarios, crearUsuario, editarUsuario, eliminarUsuario } = require('../controladores/controladorUsuarios');

router.get('/', obtenerUsuarios);
router.post('/', crearUsuario);
router.put('/:id', editarUsuario);
router.delete('/:id', eliminarUsuario);

router.post('/login', async (req, res) => {
    try {
        const { nombre, contrasena } = req.body;
        const usuario = await Usuario.findOne({ nombre, contrasena, activo: true });
        if (!usuario) {
            return res.status(401).json({ mensaje: 'Nombre o contraseña incorrectos' });
        }
        res.json({ _id: usuario._id, nombre: usuario.nombre, rol: usuario.rol });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al iniciar sesión', error: error.message });
    }
});

module.exports = router;