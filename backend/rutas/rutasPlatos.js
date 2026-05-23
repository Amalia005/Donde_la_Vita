// Rutas de la API para platos
const express = require('express');
const router = express.Router();
const {
  subirImagen,
  obtenerPlatos,
  obtenerPlatoPorId,
  crearPlato,
  editarPlato,
  cambiarDisponibilidad,
  eliminarPlato
} = require('../controladores/controladorPlatos');

router.get('/', obtenerPlatos);
router.get('/:id', obtenerPlatoPorId);
router.post('/', subirImagen.single('imagen'), crearPlato);
router.put('/:id', subirImagen.single('imagen'), editarPlato);
router.patch('/:id/disponibilidad', cambiarDisponibilidad);
router.delete('/:id', eliminarPlato);

module.exports = router;
