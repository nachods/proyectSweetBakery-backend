const express = require("express");
const CatalogoController = require("../controllers/catalogo/catalogo"); // Importamos el controlador

const api = express.Router();

const multiparty = require('connect-multiparty');
const md_upload = multiparty({ uploadDir: './uploads' }); // Aquí se suben los archivos directamente a uploads

// Rutas de catálogos
api.post('/catalogo', [md_upload], CatalogoController.createCatalogo); // Crear catálogo
api.get('/catalogo', CatalogoController.getCatalogo); // Obtener todos los catálogos
api.patch('/catalogo/:nombre', [md_upload], CatalogoController.updateCatalogo); // Actualizaciones parciales y no totales
api.delete('/catalogo/:nombre', CatalogoController.deleteCatalogo); // Eliminar catálogo

module.exports = api;
