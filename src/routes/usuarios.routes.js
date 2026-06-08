const express = require('express');
const router = express.Router();
const { getUser, getUserById, createUser } = require('../controller/usuarios.controller');
const { CheckUser } = require('../middleware/validation.middleware');
const { CheckToken } = require('../middleware/auth.middleware');


router.get('/', CheckToken, getUser);
router.get('/:id', CheckToken, getUserById);

module.exports = router;