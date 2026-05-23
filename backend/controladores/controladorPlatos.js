const Plato = require('../modelos/Plato');
const multer = require('multer');
const path = require('path');

// --- Configuración de Multer (subida de imágenes) ---
const almacenamiento = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const nombreUnico = `${Date.now()}-${file.originalname}`;
    cb(null, nombreUnico);
  }
});

const filtroArchivo = (req, file, cb) => {
  const tiposPermitidos = /jpeg|jpg|png|webp/;
  const esValido = tiposPermitidos.test(path.extname(file.originalname).toLowerCase());
  esValido ? cb(null, true) : cb(new Error('Solo se permiten imágenes (jpeg, jpg, png, webp)'));
};

const subirImagen = multer({ storage: almacenamiento, fileFilter: filtroArchivo });

// --- Funciones ---

const obtenerPlatos = async (req, res) => {
  try {
    const filtro = {};
    if (req.query.categoria) filtro.categoria = req.query.categoria;
    if (req.query.disponible !== undefined) filtro.disponible = req.query.disponible === 'true';

    const platos = await Plato.find(filtro);
    res.json(platos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los platos', error: error.message });
  }
};

const obtenerPlatoPorId = async (req, res) => {
  try {
    const plato = await Plato.findById(req.params.id);
    if (!plato) return res.status(404).json({ mensaje: 'Plato no encontrado' });
    res.json(plato);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el plato', error: error.message });
  }
};

const crearPlato = async (req, res) => {
  try {
    const datosPlato = { ...req.body };
    if (req.file) datosPlato.imagen = `/uploads/${req.file.filename}`;

    const nuevoPlato = await Plato.create(datosPlato);
    res.status(201).json(nuevoPlato);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear el plato', error: error.message });
  }
};

const editarPlato = async (req, res) => {
  try {
    const datosActualizados = { ...req.body };
    if (req.file) datosActualizados.imagen = `/uploads/${req.file.filename}`;

    const plato = await Plato.findByIdAndUpdate(req.params.id, datosActualizados, { new: true, runValidators: true });
    if (!plato) return res.status(404).json({ mensaje: 'Plato no encontrado' });
    res.json(plato);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al editar el plato', error: error.message });
  }
};

const cambiarDisponibilidad = async (req, res) => {
  try {
    const plato = await Plato.findById(req.params.id);
    if (!plato) return res.status(404).json({ mensaje: 'Plato no encontrado' });

    plato.disponible = !plato.disponible;
    await plato.save();
    res.json(plato);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al cambiar la disponibilidad', error: error.message });
  }
};

const eliminarPlato = async (req, res) => {
  try {
    const plato = await Plato.findByIdAndDelete(req.params.id);
    if (!plato) return res.status(404).json({ mensaje: 'Plato no encontrado' });
    res.json({ mensaje: 'Plato eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el plato', error: error.message });
  }
};

module.exports = { subirImagen, obtenerPlatos, obtenerPlatoPorId, crearPlato, editarPlato, cambiarDisponibilidad, eliminarPlato };
