
const cursoService = require('../services/cursos.service');

async function getCursos(req, res, next) {
    try {
        const cursos = await cursoService.getCursos()
        res.json({ cursos })

    }
    catch (error) {
        next(error)
    }
}

async function getCursoById(req, res, next) {
    try {
        const id = Number(req.params.id);
        const curso = await cursoService.getCursoById(id);
        res.json({ curso });
    }
    catch (error) {
        next(error)
    }
}

async function createCurso(req, res, next) {
    try {
        const { nombre, descripcion, profesor_id } = req.body;
        const curso = await cursoService.createCurso(nombre, descripcion, profesor_id);
        res.status(201).json({ curso });
    }
    catch (error) {
        next(error)
    }
}

async function updateCurso(req, res, next) {
    try {
        const id = Number(req.params.id);
        const { nombre, descripcion, profesor_id } = req.body;
        const curso = await cursoService.updateCurso(id, nombre, descripcion, profesor_id);
        res.json({ curso });
    }
    catch (error) {
        next(error)
    }
}

async function removeCurso(req, res, next) {
    try {
        const id = Number(req.params.id);
        const curso = await cursoService.removeCurso(id);
        res.json({ curso });
    }
    catch (error) {
        next(error)
    }
}


module.exports = { getCursos, getCursoById, createCurso, updateCurso, removeCurso };