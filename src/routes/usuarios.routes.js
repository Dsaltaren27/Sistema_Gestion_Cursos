const express = require('express');
const router = express.Router();
const { getUser, getUserById, createUser } = require('../controller/usuarios.controller');
const { CheckUser } = require('../middleware/validation.middleware');
const { CheckToken } = require('../middleware/auth.middleware');
const {CheckRole} = require('../middleware/roles.middleware')
const { ROLES } = require('../utils/constants');


router.get('/', CheckToken, CheckRole(ROLES.ADMIN), getUser);
router.get('/:id', CheckToken, getUserById);
router.post('/', CheckToken,CheckRole(ROLES.ADMIN),CheckUser, createUser)

module.exports = router;