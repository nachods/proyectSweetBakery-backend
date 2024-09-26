const express = require('express');
const LoginController = require('../controllers/user/login');

const api = express.Router();

api.post('/login',LoginController.login);

module.exports = api;