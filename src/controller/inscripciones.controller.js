const inscripcionesServices = require('../services/inscripciones.service')

async function getInscripciones(req, res, next) {
    try {
        const inscripciones = await inscripcionesServices.getInscripciones();
        res.json({ inscripciones });

    } catch (error) {
        next(error);
    }
}

async function getInscripcionById(req, res, next) {
    try {
        const id = Number(req.params.id);
        const inscripcion = await inscripcionesServices.getInscripcionById(id);
        res.json({ inscripcion });
        
    } catch (error) {
        next(error);
    }
}
async function createInscripcion(req, res, next) {
    try {
        const { usuario_id, curso_id } = req.body;
        const inscripcion = await inscripcionesServices.createInscripcion(usuario_id, curso_id);
        res.status(201).json({ inscripcion });

    } catch (error) {
        next(error);
    }
}

async function removeInscripcion(req, res, next) {
    try {
        const id = Number(req.params.id);
        const inscripcion = await inscripcionesServices.removeInscripcion(id);
        res.json({ inscripcion });

    }
    catch (error) {

        next(error)
    }

}

module.exports = { getInscripciones, getInscripcionById, createInscripcion, removeInscripcion };