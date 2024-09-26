require("dotenv").config();
const express = require("express"); 
const bodyParser = require("body-parser");
const cors = require("cors");
const apiVersion = process.env.API_VERSION;

//Crear apps
const app = express();

//Config
app.use(cors());

//Importar Rutas
const registerRoutes = require('./router/register');
const LoginRoutes = require('./router/login');

//Proceso de Datos
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Static Folder
app.use(express.static("uploads"));

//Configurar Rutas
app.use(`/api/${apiVersion}`, registerRoutes);
app.use(`/api/${apiVersion}`, LoginRoutes);

module.exports = app;