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
        .trim()
        .min(3)
        .max(100)
        .required(),

    email: Joi.string()
        .trim()
        .lowercase()
        .email()
        .required(),

    password: Joi.string()
        .trim()
        .min(6)
        .max(50)
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