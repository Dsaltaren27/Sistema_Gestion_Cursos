const { AppError } = require('../errors/AppError');
const inscripRepo = require('../repositories/inscripciones.repository');

async function getInscripciones() {

    return await inscripRepo.findAll();

}

async function getInscripcionById(id) {

    const inscripcion = await inscripRepo.findById(id);
    if (!inscripcion) throw new AppError('inscripcion no encontrado', 404);

    return inscripcion;
}
async function createInscripcion(usuario_id, curso_id) {

    const existing = await inscripRepo.findByUsuarioCurso(usuario_id, curso_id);
    if (existing) throw new AppError('El usuario ya está inscrito en este curso', 409);
    return await inscripRepo.create(usuario_id, curso_id);

}

async function removeInscripcion(id) {
    const inscripcion = await inscripRepo.findById(id)
    if (!inscripcion) throw new AppError('no hay inscripcion', 404)
    return await inscripRepo.remove(id);



}

module.exports = { getInscripciones, getInscripcionById, createInscripcion, removeInscripcion };