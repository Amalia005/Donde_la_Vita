//Modelo para los platos del menú
const mongoose = require('mongoose');

const esquemaPlato = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre del plato es obligatorio'],
    trim: true
  },
  descripcion: {
    type: String,
    trim: true
  },
  ingredientes: {
    type: [String],
    default: []
  },
  precio: {
    type: Number,
    required: [true, 'El precio del plato es obligatorio']
  },
  categoria: {
    type: String,
    required: [true, 'La categoría del plato es obligatoria'],
    enum: {
      values: ['Menús del día', 'Platos de fondo', 'Agregados', 'Bebestibles'],
      message: '{VALUE} no es una categoría de plato válida'
    }
  },
  imagen: {
    type: String
  },
  disponible: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('Plato', esquemaPlato);
