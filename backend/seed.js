// datos iniciales para la base de datos
const mongoose = require('mongoose');
const conectarDB = require('./configuracion/baseDeDatos');
const Plato = require('./modelos/Plato');
const Usuario = require('./modelos/Usuario');

const platosIniciales = [
  // Menús del día
  {
    nombre: 'POROTOS CON RIENDA + HUEVO',
    descripcion: 'Deliciosos porotos tradicionales con tallarines y huevo frito',
    ingredientes: ['porotos', 'tallarines', 'huevo'],
    precio: 3800,
    categoria: 'Menús del día',
    imagen: ''
  },
  {
    nombre: 'Porotos con rienda + longaniza o huevo + ensalada',
    descripcion: 'Porotos con tallarines acompañados de longaniza parrillera o huevo frito, más ensalada fresca',
    ingredientes: ['porotos', 'tallarines', 'longaniza o huevo', 'ensalada surtida'],
    precio: 5500,
    categoria: 'Menús del día',
    imagen: ''
  },
  {
    nombre: '1/4 de pollo + 1 Agregados (arroz o ensalada)',
    descripcion: 'Presa de pollo asado con acompañamiento a elección entre arroz o ensalada surtida',
    ingredientes: ['pollo asado', 'arroz o ensalada'],
    precio: 5200,
    categoria: 'Menús del día',
    imagen: ''
  },
  {
    nombre: '1/4 de pollo + 1 Agregados (papas mayo, papas fritas o puré)',
    descripcion: 'Presa de pollo asado con acompañamiento a elección entre papas mayo, papas fritas o puré de papas',
    ingredientes: ['pollo asado', 'papas mayo o papas fritas o puré'],
    precio: 5500,
    categoria: 'Menús del día',
    imagen: ''
  },
  // Platos de fondo
  {
    nombre: 'Truto o pechuga arvejada + 2 Agregados + ensalada y consomé',
    descripcion: 'Truto o pechuga cocinada a la cacerola con arvejas, acompañado de dos agregados, ensalada y consomé de entrada',
    ingredientes: ['pollo arvejado', 'dos agregados', 'ensalada', 'consomé'],
    precio: 6200,
    categoria: 'Platos de fondo',
    imagen: ''
  },
  {
    nombre: 'Cazuela de vacuno + ensalada',
    descripcion: 'Tradicional cazuela de vacuno cocida con verduras de estación, choclo, zapallo y ensalada surtida de acompañamiento',
    ingredientes: ['carne de vacuno', 'choclo', 'zapallo', 'papa', 'arroz', 'ensalada'],
    precio: 6800,
    categoria: 'Platos de fondo',
    imagen: ''
  },
  {
    nombre: 'Chuleta + 2 Agregados + ensalada y consomé',
    descripcion: 'Chuleta de cerdo dorada a la plancha con dos agregados a elección, ensalada fresca y consomé caliente',
    ingredientes: ['chuleta de cerdo', 'dos agregados', 'ensalada', 'consomé'],
    precio: 6800,
    categoria: 'Platos de fondo',
    imagen: ''
  },
  {
    nombre: 'Carne mechada + 2 Agregados + ensalada y consomé',
    descripcion: 'Carne de vacuno tierna cocida a fuego lento con salsa de verduras, con dos agregados, ensalada y consomé',
    ingredientes: ['carne mechada', 'dos agregados', 'ensalada', 'consomé'],
    precio: 7500,
    categoria: 'Platos de fondo',
    imagen: ''
  },
  {
    nombre: 'Pechuga apanada + 2 Agregados + ensalada y consomé',
    descripcion: 'Pechuga de pollo apanada y crujiente, servida con dos agregados a elección, ensalada fresca y consomé',
    ingredientes: ['pechuga de pollo', 'pan rallado', 'dos agregados', 'ensalada', 'consomé'],
    precio: 6800,
    categoria: 'Platos de fondo',
    imagen: ''
  },
  {
    nombre: 'Bistec + 2 Agregados + ensalada y consomé',
    descripcion: 'Bistec de vacuno jugoso a la plancha con dos agregados a elección, ensalada y consomé',
    ingredientes: ['bistec de vacuno', 'dos agregados', 'ensalada', 'consomé'],
    precio: 5800,
    categoria: 'Platos de fondo',
    imagen: ''
  },
  {
    nombre: 'Pollo asado + 2 Agregados + ensalada y consomé',
    descripcion: 'Presa de pollo asada al horno con dos agregados a elección, ensalada fresca y consomé',
    ingredientes: ['pollo asado', 'dos agregados', 'ensalada', 'consomé'],
    precio: 5800,
    categoria: 'Platos de fondo',
    imagen: ''
  },
  {
    nombre: 'Pechuga a la plancha + 2 Agregados + ensalada y consomé',
    descripcion: 'Pechuga de pollo sazonada a la plancha, con dos agregados, ensalada fresca y consomé de entrada',
    ingredientes: ['pechuga de pollo', 'dos agregados', 'ensalada', 'consomé'],
    precio: 6200,
    categoria: 'Platos de fondo',
    imagen: ''
  },
  // Agregados
  {
    nombre: 'Arroz',
    descripcion: 'Porción de arroz blanco graneado',
    ingredientes: ['arroz'],
    precio: 0,
    categoria: 'Agregados',
    imagen: ''
  },
  {
    nombre: 'Papas fritas',
    descripcion: 'Porción de papas fritas crujientes',
    ingredientes: ['papas fritas'],
    precio: 1500,
    categoria: 'Agregados',
    imagen: ''
  },
  {
    nombre: 'Ensalada',
    descripcion: 'Porción de ensalada surtida de la estación',
    ingredientes: ['ensalada mixta'],
    precio: 1000,
    categoria: 'Agregados',
    imagen: ''
  },
  {
    nombre: 'Puré de papas',
    descripcion: 'Porción de puré de papas casero',
    ingredientes: ['papas', 'leche', 'mantequilla'],
    precio: 1500,
    categoria: 'Agregados',
    imagen: ''
  },
  {
    nombre: 'Papas mayo',
    descripcion: 'Porción de papas cocidas con mayonesa y un toque de cilantro',
    ingredientes: ['papas cocidas', 'mayonesa', 'cilantro'],
    precio: 1500,
    categoria: 'Agregados',
    imagen: ''
  },
  {
    nombre: 'Papas doradas',
    descripcion: 'Porción de papas doradas al horno con finas hierbas',
    ingredientes: ['papas', 'aceite', 'hierbas'],
    precio: 1500,
    categoria: 'Agregados',
    imagen: ''
  },
  // Bebestibles
  {
    nombre: 'Bebida express',
    descripcion: 'Bebida en lata de 350ml (Coca-cola, Fanta o Sprite según disponibilidad)',
    ingredientes: ['bebida'],
    precio: 850,
    categoria: 'Bebestibles',
    imagen: ''
  },
  {
    nombre: 'Agua mineral',
    descripcion: 'Agua mineral embotellada de 500ml (con o sin gas)',
    ingredientes: ['agua mineral'],
    precio: 1200,
    categoria: 'Bebestibles',
    imagen: ''
  }
];

const usuariosIniciales = [
  { nombre: 'Benjamín', rol: 'garzon', activo: true, contrasena: '123' },
  { nombre: 'Ricardo', rol: 'cocina', activo: true, contrasena: '123' },
  { nombre: 'Vitalia', rol: 'admin', activo: true, contrasena: '123' }
];

const sembrarDatos = async () => {
  try {
    await conectarDB();

    // Limpiar colecciones
    await Plato.deleteMany({});
    await Usuario.deleteMany({});
    console.log('Colecciones existentes limpiadas.');

    // Insertar Platos
    const platosInsertados = await Plato.insertMany(platosIniciales);
    console.log(`${platosInsertados.length} Platos creados con éxito.`);

    // Insertar Usuarios
    const usuariosInsertados = await Usuario.insertMany(usuariosIniciales);
    console.log(`${usuariosInsertados.length} Usuarios creados con éxito.`);

    console.log('Semillero de datos completado exitosamente.');
    process.exit(0);
  } catch (error) {
    console.error(`Error al sembrar datos: ${error.message}`);
    process.exit(1);
  }
};

sembrarDatos();
