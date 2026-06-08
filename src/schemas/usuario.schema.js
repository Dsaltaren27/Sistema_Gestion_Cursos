const Joi = require('joi');

const usuarioSchema = Joi.object({
    nombre: Joi.string()
        .min(3)
        .required(),

    email: Joi.string()
        .email()
        .required(),

    password: Joi.string()
        .min(6)
        .required()
});

module.exports = {
    usuarioSchema
};