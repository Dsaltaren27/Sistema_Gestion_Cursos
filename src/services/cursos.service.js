const { AppError } = require('../errors/AppError');
const cursoRepo = require('../repositories/cursos.repository');

async function getCursos() {
    return await cursoRepo.findAll();
}

async function getCursoById(id) {
    const curso = await cursoRepo.findById(id);
    if (!curso) throw new AppError('Curso no encontrado', 404);
    return curso;
}

async function createCurso(nombre, descripcion, profesor_id) {
    return await cursoRepo.create(nombre, descripcion, profesor_id);
}

async function updateCurso(id, nombre, descripcion, profesor_id) {
    const curso = await cursoRepo.findById(id);
    if (!curso) throw new AppError('Curso no encontrado', 404);
    return await cursoRepo.update(id, nombre, descripcion, profesor_id);
}

async function removeCurso(id) {
    const curso = await cursoRepo.findById(id);
    if (!curso) throw new AppError('Curso no encontrado', 404);
    return await cursoRepo.remove(id);
}

module.exports = { getCursos, getCursoById, createCurso, updateCurso, removeCurso };