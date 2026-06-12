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
    return res.status(400).json({
      error: 'Datos inválidos',
      detalles: error.details.map(d => ({ campo: d.path.join('.'), mensaje: d.message }))
    });
  }

  req.body = value;
  next();
}

function validateLogin(req, res, next) {

  const { error } = loginSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      error: error.details[0].message
    });
  }

  next();

}

function validateRegister(req, res, next) {

  const { error } = registerSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      error: error.details[0].message
    });
  }

  next();

}



function validateCurso(req, res, next) {
  const { error, value } = cursoSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      error: 'Datos inválidos',
      detalles: error.details.map(d => ({ campo: d.path.join('.'), mensaje: d.message }))
    });
  }

  req.body = value;
  next();
}

function validateInscripcion(req, res, next) {

const { error } = inscripcionSchema.validate(req.body);

if (error) {
    return res.status(400).json({
        error: error.details[0].message
    });
}

next();

}

module.exports = { CheckUser, validateCurso,validateInscripcion, validateLogin, validateRegister };