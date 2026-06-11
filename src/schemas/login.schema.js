const Joi = require('joi');

const loginSchema = Joi.object({
    email: Joi.string()
        .email()
        .required(),

    password: Joi.string()
        .min(6)
        .required()
});

const registerSchema = Joi.object({
    nombre: Joi.string()
        .min(3)
        .required(),

    email: Joi.string()
        .email()
        .required(),

    password: Joi.string()
        .min(6)
        .required(),

    rol: Joi.string()
        .valid(
            'admin',
            'profesor',
            'estudiante'
        )
        .required()
});

module.exports = {
    loginSchema,
    registerSchema
};