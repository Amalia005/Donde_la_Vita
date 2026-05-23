// Modelo para los pedidos
const mongoose = require('mongoose');

const esquemaPedido = new mongoose.Schema({
  mesa: {
    type: Number,
    required: [true, 'El número de mesa es obligatorio'],
    min: [1, 'El número de mesa debe ser al menos 1'],
    max: [15, 'El número de mesa no puede ser superior a 15']
  },
  platos: [
    {
      plato: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Plato',
        required: [true, 'La referencia al plato es obligatoria']
      },
      cantidad: {
        type: Number,
        default: 1,
        min: [1, 'La cantidad mínima es 1']
      },
      comentario: {
        type: String,
        trim: true,
        default: ''
      }
    }
  ],
  estado: {
    type: String,
    default: 'pendiente',
    enum: {
      values: ['pendiente', 'en preparación', 'listo', 'entregado'],
      message: '{VALUE} no es un estado de pedido válido'
    }
  },
  total: {
    type: Number,
    required: true,
    default: 0
  },
  creadoEn: {
    type: Date,
    default: Date.now
  },
  actualizadoEn: {
    type: Date,
    default: Date.now
  }
});

//actualiza la fecha de modificación antes de guardar
esquemaPedido.pre('save', function (next) {
  this.actualizadoEn = Date.now();
  next();
});

module.exports = mongoose.model('Pedido', esquemaPedido);
