const express = require('express');
const router = express.Router();
const { login, register } = require('../controller/auth.controller');
const { validateLogin, validateRegister } = require('../middleware/validation.middleware');
const {authLimiter} = require('../middleware/rateLimit.middleware')

router.post('/login',authLimiter,validateLogin,  login);
router.post('/register',authLimiter, validateRegister,register);

module.exports = router;