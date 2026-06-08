const Joi = require('joi');

const cursoSchema = Joi.object({
    nombre: Joi.string()
        .min(3)
        .required(),

    descripcion: Joi.string()
        .required(),

    profesor_id: Joi.number()
        .integer()
        .required()
});

module.exports = {
    cursoSchema
};