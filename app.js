require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer"); // Importar multer
const apiVersion = process.env.API_VERSION;

// Crear apps
const app = express();

// Configuración de CORS
app.use(cors());

// Configuración de multer para manejar archivos
const upload = multer({ dest: 'uploads/' }); // La carpeta donde se almacenan los archivos

// Importar Rutas
const registerRoutes = require('./router/register');
const loginRoutes = require('./router/login');
const getMeRoutes = require('./router/getMe');
const catalogoRoutes = require('./router/catalogo');

// Procesamiento de Datos (Limites de body-parser)
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// Static Folder para servir archivos estáticos
app.use(express.static("uploads"));

// Configurar Rutas con carga de archivos usando multer
// Suponiendo que 'register' pueda necesitar cargar archivos
app.use(`/api/${apiVersion}`, registerRoutes);
app.use(`/api/${apiVersion}/upload`, upload.single('file'), (req, res) => {
    // Aquí puedes manejar los datos y el archivo
    console.log(req.file); // Información del archivo cargado
    console.log(req.body); // Otros datos del formulario
    res.send('Archivo cargado exitosamente');
});

// Configurar Rutas para otros endpoints sin carga de archivos
app.use(`/api/${apiVersion}`, loginRoutes);
app.use(`/api/${apiVersion}`, getMeRoutes);
app.use(`/api/${apiVersion}`, catalogoRoutes);

module.exports = app;
