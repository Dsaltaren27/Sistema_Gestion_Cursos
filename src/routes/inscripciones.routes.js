const express = require('express');
const router = express.Router();
const { getInscripciones,getInscripcionById, createInscripcion, removeInscripcion } = require('../controller/inscripciones.controller');
const {CheckToken}= require('../middleware/auth.middleware');
const { validateInscripcion } = require('../middleware/validation.middleware');
const {CheckRole} = require('../middleware/roles.middleware')
const { ROLES } = require('../utils/constants');


router.get('/', CheckToken, CheckRole(ROLES.ADMIN),getInscripciones);
router.get('/:id',CheckToken,getInscripcionById);
router.post('/', CheckToken ,CheckRole(ROLES.ADMIN,ROLES.ESTUDIANTE, ROLES.PROFESOR),validateInscripcion, createInscripcion);
router.delete('/:id',CheckToken, removeInscripcion);

module.exports = router;