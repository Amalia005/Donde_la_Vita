const express = require('express');
const router = express.Router();

module.exports = (io) => {
  const { obtenerPedidos, obtenerPedidoPorId, crearPedido, actualizarEstado } =
    require('../controladores/controladorPedidos')(io);

  router.get('/', obtenerPedidos);
  router.get('/:id', obtenerPedidoPorId);
  router.post('/', crearPedido);
  router.patch('/:id/estado', actualizarEstado);

  return router;
};
