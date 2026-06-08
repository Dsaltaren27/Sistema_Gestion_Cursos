const express = require('express');
const router = express.Router();
const { getUser, getUserById, createUser } = require('../controllers/usuarios.controller');
const { validarUsuario } = require('../middlewares/validation.middleware');
const { verificarToken } = require('../middlewares/auth.middleware');


router.get('/', verificarToken,getUser);
router.get('/:id',verificarToken, getUserById);
router.post('/', verificarToken, validarUsuario, createUser);

module.exports = router;