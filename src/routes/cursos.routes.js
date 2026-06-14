const express = require('express');
const router = express.Router();
const { getCursos, getCursoById, createCurso, updateCurso, removeCurso } = require('../controller/cursos.controller');
const { validateCurso } = require('../middleware/validation.middleware');
const { CheckToken } = require('../middleware/auth.middleware');
const {CheckRole} = require('../middleware/roles.middleware')
const { ROLES } = require('../utils/constants');

router.get('/', CheckToken, CheckRole(ROLES.ADMIN, ROLES.PROFESOR), getCursos);
router.get('/:id', CheckToken, CheckRole(ROLES.ADMIN,ROLES.ESTUDIANTE, ROLES.PROFESOR), getCursoById);
router.post('/', CheckToken,CheckRole(ROLES.ADMIN), validateCurso, createCurso);
router.put('/:id', CheckToken, CheckRole(ROLES.ADMIN), validateCurso, updateCurso);
router.delete('/:id', CheckToken,  CheckRole(ROLES.ADMIN),removeCurso);

module.exports = router;