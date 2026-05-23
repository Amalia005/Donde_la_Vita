// baseDeDatos.js - Configuración y conexión de MongoDB
const mongoose = require('mongoose');

const conectarDB = async () => {
  try {
    const enlace = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/donde_la_vita');
    console.log(`MongoDB Conectado: ${enlace.connection.host}`);
  } catch (error) {
    console.error(`Error al conectar a la base de datos: ${error.message}`);
    process.exit(1);
  }
};

module.exports = conectarDB;
