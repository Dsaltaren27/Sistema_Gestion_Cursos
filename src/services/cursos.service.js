const { AppError } = require('../errors/AppError');
const cursoRepo = require('../repositories/cursos.repository');
const usuarioRepo = require('../repositories/usuarios.repository');
const { ROLES } = require('../utils/constants');

async function getCursos() {
    return await cursoRepo.findAll();
}

async function getCursoById(id) {
    const curso = await cursoRepo.findById(id);
    if (!curso) throw new AppError('Curso no encontrado', 404);
    return curso;
}

async function createCurso(nombre, descripcion, profesor_id) {

    const profesor = await usuarioRepo.findById(profesor_id);
    if (!profesor)throw new AppError('Profesor no encontrado', 404);
    if (profesor.rol !== ROLES.PROFESOR) throw new AppError('El usuario asignado no es profesor', 400);
    return cursoRepo.create(nombre, descripcion, profesor_id);
}

async function updateCurso(id, nombre, descripcion, profesor_id) {

    const curso = await cursoRepo.findById(id);
    if (!curso) throw new AppError('Curso no encontrado', 404);
    const profesor = await usuarioRepo.findById(profesor_id);
    if (!profesor) throw new AppError('Profesor no encontrado', 404);
    if (profesor.rol !== ROLES.PROFESOR) throw new AppError('El usuario asignado no es profesor', 400);
    return cursoRepo.update(id, nombre, descripcion, profesor_id);
}

async function removeCurso(id) {
    const curso = await cursoRepo.findById(id);
    if (!curso) throw new AppError('Curso no encontrado', 404);
    return await cursoRepo.remove(id);
}

module.exports = { getCursos, getCursoById, createCurso, updateCurso, removeCurso };