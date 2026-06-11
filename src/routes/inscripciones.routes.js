const express = require('express');
const router = express.Router();
const { getInscripciones,getInscripcionById, createInscripcion, removeInscripcion } = require('../controller/inscripciones.controller');
const {CheckToken}= require('../middleware/auth.middleware');
const { validateInscripcion } = require('../middleware/validation.middleware');


router.get('/', CheckToken ,getInscripciones);
router.get('/:id',CheckToken, getInscripcionById);
router.post('/', CheckToken ,validateInscripcion, createInscripcion);
router.delete('/:id',CheckToken, removeInscripcion);

module.exports = router;