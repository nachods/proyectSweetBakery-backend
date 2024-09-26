const express = require('express');
const RegisterController = require('../controllers/user/register');

const api = express.Router();

api.post('/register',RegisterController.register);

module.exports = api;