const Joi = require('joi');

const usuarioSchema = Joi.object({
    nombre: Joi.string()
        .trim()
        .min(3)
        .max(100)
        .required(),

    email: Joi.string()
        .trim()
        .email()
        .lowercase()
        .required(),

    password: Joi.string()
        .trim()
        .min(6)
        .max(50)
        .required(),


    rol: Joi.string()
      .valid('admin','profesor','estudiante')
      .required()

});

module.exports = {
    usuarioSchema
};