const { AppError } = require('../errors/AppError');
const inscripRepo = require('../repositories/inscripciones.repository');

async function getInscripciones(usuario) {

    if(usuario.rol === 'admin'){

         return await inscripRepo.findAll();

    }

    if(usuario.rol === 'profesor'){

    return await inscripRepo.findByProfesor(usuario.id);
        
    }

     throw new AppError('No autorizado', 403);

}

async function getInscripcionById(id,usuario) {

    const inscripcion = await inscripRepo.findById(id);
    if (!inscripcion) throw new AppError('inscripcion no encontrado', 404);

   
  if (usuario.rol === 'admin') {
    return inscripcion;
  }

  if (usuario.rol === 'estudiante' && inscripcion.usuario_id === usuario.id) {
    return inscripcion;
  }

}
async function createInscripcion(usuario, body) {

    let usuario_id;

  if (usuario.rol === 'admin') {
    usuario_id = body.usuario_id; // admin puede inscribir a cualquiera
  } else if (usuario.rol === 'estudiante') {
    usuario_id = usuario.id; // el estudiante SIEMPRE se inscribe a sí mismo
  } else {
    throw new AppError('No autorizado', 403);
  }
    
    const curso_id = body.curso_id;

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