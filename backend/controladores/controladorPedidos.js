const Pedido = require('../modelos/Pedido');
const Plato = require('../modelos/Plato');

module.exports = (io) => {

  const obtenerPedidos = async (req, res) => {
    try {
      const filtro = {};
      if (req.query.estado) filtro.estado = req.query.estado;

      const pedidos = await Pedido.find(filtro)
        .populate('platos.plato', 'nombre precio')
        .sort({ creadoEn: 1 });
      res.json(pedidos);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al obtener los pedidos', error: error.message });
    }
  };

  const obtenerPedidoPorId = async (req, res) => {
    try {
      const pedido = await Pedido.findById(req.params.id)
        .populate('platos.plato', 'nombre precio');
      if (!pedido) return res.status(404).json({ mensaje: 'Pedido no encontrado' });
      res.json(pedido);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al obtener el pedido', error: error.message });
    }
  };

  const crearPedido = async (req, res) => {
    try {
      const { mesa, platos } = req.body;

      // Calcular el total consultando los precios reales desde la base de datos
      let total = 0;
      for (const item of platos) {
        const platoEnDB = await Plato.findById(item.plato);
        if (!platoEnDB) return res.status(404).json({ mensaje: `Plato con id ${item.plato} no encontrado` });
        total += platoEnDB.precio * (item.cantidad || 1);
      }

      const nuevoPedido = await Pedido.create({ mesa, platos, total });
      const pedidoCompleto = await nuevoPedido.populate('platos.plato', 'nombre precio');

      // Emitir evento a la vista de Cocina
      io.emit('nuevo-pedido', pedidoCompleto);

      res.status(201).json(pedidoCompleto);
    } catch (error) {
      res.status(400).json({ mensaje: 'Error al crear el pedido', error: error.message });
    }
  };

  const actualizarEstado = async (req, res) => {
    try {
      const { estado } = req.body;
      const pedido = await Pedido.findByIdAndUpdate(
        req.params.id,
        { estado, actualizadoEn: Date.now() },
        { new: true, runValidators: true }
      ).populate('platos.plato', 'nombre precio');

      if (!pedido) return res.status(404).json({ mensaje: 'Pedido no encontrado' });

      // Emitir evento general de actualización
      io.emit('pedido-actualizado', pedido);

      // Emitir evento específico cuando el pedido está listo
      if (estado === 'listo') {
        io.emit('pedido-listo', { mesa: pedido.mesa, pedidoId: pedido._id });
      }

      res.json(pedido);
    } catch (error) {
      res.status(400).json({ mensaje: 'Error al actualizar el estado', error: error.message });
    }
  };

  return { obtenerPedidos, obtenerPedidoPorId, crearPedido, actualizarEstado };
};
