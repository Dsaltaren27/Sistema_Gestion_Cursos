const { AppError } = require("../errors/AppError");
const inscripRepo = require("../repositories/inscripciones.repository");
const cursoRepo = require("../repositories/cursos.repository");
const { ROLES } = require("../utils/constants");

async function getInscripciones(usuario) {
  if (usuario.rol === ROLES.ADMIN) {
    return inscripRepo.findAll();
  }

  if (usuario.rol === ROLES.PROFESOR) {
    return inscripRepo.findByProfesor(usuario.id);
  }
  throw new AppError("No autorizado", 403);
}

async function getInscripcionById(id, usuarioLogueado) {
  const inscripcion = await inscripRepo.findById(id);
  if (!inscripcion) throw new AppError("Inscripción no encontrado", 404);
  if (
    usuarioLogueado.rol === ROLES.ESTUDIANTE &&
    inscripcion.usuario_id !== usuarioLogueado.id
  ) {
    throw new AppError("Acceso denegado", 403);
  }
  return inscripcion;
}

async function createInscripcion(usuario, body) {
  let usuario_id;

  if (usuario.rol === ROLES.ADMIN) {
    usuario_id = body.usuario_id;
  } else if (usuario.rol === ROLES.ESTUDIANTE) {
    usuario_id = usuario.id;
  } else {
    throw new AppError("No autorizado", 403);
  }

  const curso_id = body.curso_id;
  const curso = await cursoRepo.findById(curso_id);
  if (!curso) throw new AppError("Curso no encontrado", 404);

  const existing = await inscripRepo.findByUsuarioCurso(usuario_id, curso_id);
  if (existing)
    throw new AppError("El usuario ya está inscrito en este curso", 409);
  return await inscripRepo.create(usuario_id, curso_id);
}

async function removeInscripcion(id) {
  const inscripcion = await inscripRepo.findById(id);
  if (!inscripcion) throw new AppError("Inscripción no encontrada", 404);
  return await inscripRepo.remove(id);
}

module.exports = {
  getInscripciones,
  getInscripcionById,
  createInscripcion,
  removeInscripcion,
};
