const express = require('express');
const router = express.Router();
const { obtenerUsuarios, crearUsuario, editarUsuario, eliminarUsuario } = require('../controladores/controladorUsuarios');

router.get('/', obtenerUsuarios);
router.post('/', crearUsuario);
router.put('/:id', editarUsuario);
router.delete('/:id', eliminarUsuario);

module.exports = router;
