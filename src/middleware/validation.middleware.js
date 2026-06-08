const Joi = require('joi');
const { usuarioSchema } = require('../schemas/usuario.schema');
const { cursoSchema } = require('../schemas/curso.schema');
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

module.exports = { CheckUser, validateCurso };