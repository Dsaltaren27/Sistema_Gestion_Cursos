const Joi = require('joi');

const inscripcionSchema = Joi.object({
usuario_id: Joi.number()
.integer()
.positive()
.required(),


curso_id: Joi.number()
    .integer()
    .positive()
    .required()


});

module.exports = { inscripcionSchema };
