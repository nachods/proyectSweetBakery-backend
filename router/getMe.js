const express = require('express');
const GetMeController = require('../controllers/user/getMe');
const md_auth = require('../middlewares/authenticated');

const api = express.Router();

api.get('/me', [md_auth.asureAuth], GetMeController.getMe);

module.exports = api;