// Modelo para los usuarios (garzones, cocina, admin)
const mongoose = require('mongoose');

const esquemaUsuario = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre del usuario es obligatorio'],
    trim: true
  },
  rol: {
    type: String,
    required: [true, 'El rol del usuario es obligatorio'],
    enum: {
      values: ['garzon', 'cocina', 'admin'],
      message: '{VALUE} no es un rol válido'
    }
  },
  activo: {
    type: Boolean,
    default: true
  },
  contrasena: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
    trim: true
  }
});

module.exports = mongoose.model('Usuario', esquemaUsuario);
