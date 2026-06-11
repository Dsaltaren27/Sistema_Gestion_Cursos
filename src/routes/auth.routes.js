const express = require('express');
const router = express.Router();
const { login, register } = require('../controller/auth.controller');
const { validateLogin, validateRegister } = require('../middleware/auth.middleware');

router.post('/login',validateLogin, validateRegister, login);
router.post('/register', register);

module.exports = router;