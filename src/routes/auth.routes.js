const express = require('express');
const router = express.Router();
const { login, register } = require('../controller/auth.controller');
const { validateLogin, validateRegister } = require('../middleware/validation.middleware');

router.post('/login',validateLogin,  login);
router.post('/register', validateRegister,register);

module.exports = router;