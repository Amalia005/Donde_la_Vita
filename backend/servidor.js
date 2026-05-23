const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const path = require('path');
const conectarDB = require('./configuracion/baseDeDatos');

const rutasPlatos = require('./rutas/rutasPlatos');
const rutasUsuarios = require('./rutas/rutasUsuarios');

const app = express();
const servidor = http.createServer(app);
const io = new Server(servidor, {
  cors: { origin: 'http://localhost:3000' }
});

// Middlewares
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// Archivos estáticos (imágenes subidas con multer)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rutas que NO necesitan io
app.use('/api/platos', rutasPlatos);
app.use('/api/usuarios', rutasUsuarios);

// Rutas que SÍ necesitan io (se pasan como función)
app.use('/api/pedidos', require('./rutas/rutasPedidos')(io));

// Eventos de Socket.io
io.on('connection', (socket) => {
  console.log(`Cliente conectado: ${socket.id}`);
  socket.on('disconnect', () => {
    console.log(`Cliente desconectado: ${socket.id}`);
  });
});

// Conexión a la base de datos e inicio del servidor
const PUERTO = process.env.PORT || 3001;
conectarDB().then(() => {
  servidor.listen(PUERTO, () => {
    console.log(`Servidor corriendo en http://localhost:${PUERTO}`);
  });
});
