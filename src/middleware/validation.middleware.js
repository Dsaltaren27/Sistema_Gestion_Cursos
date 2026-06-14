const Joi = require('joi');
const { usuarioSchema } = require('../schemas/usuario.schema');
const { cursoSchema } = require('../schemas/curso.schema');
const { loginSchema } = require('../schemas/login.schema');
const { registerSchema } = require('../schemas/login.schema');
const { inscripcionSchema } = require('../schemas/inscripciones.schema');
const { AppError } = require('../errors/AppError');

function CheckUser(req, res, next) {
  const { error, value } = usuarioSchema.validate(req.body, { abortEarly: false });
  if (error) {

    const detalles = error.details.map(d => `${d.path.join('.')}: ${d.message}`).join(', ');
    return next(new AppError(`Datos inválidos: ${detalles}`, 400));

  }

  req.body = value;
  next();
}

function validateLogin(req, res, next) {

  const { error } = loginSchema.validate(req.body);

  if (error) {

    return next(new AppError(error.details[0].message, 400))

  }

  next();

}

function validateRegister(req, res, next) {

  const { error } = registerSchema.validate(req.body);

  if (error) {

    return next(new AppError(error.details[0].message, 400));
  }

  next();

}

function validateCurso(req, res, next) {
  const { error, value } = cursoSchema.validate(req.body, { abortEarly: false });
  if (error) {

    const detalles = error.details.map(d => `${d.path.join('.')}: ${d.message}`).join(', ');
    return next(new AppError(`Datos inválidos: ${detalles}`, 400));


  }

  req.body = value;
  next();
}

function validateInscripcion(req, res, next) {

  const { error } = inscripcionSchema.validate(req.body);

  if (error) {
    return next(new AppError(error.details[0].message, 400));
  }

  next();

}

module.exports = { CheckUser, validateCurso, validateInscripcion, validateLogin, validateRegister };