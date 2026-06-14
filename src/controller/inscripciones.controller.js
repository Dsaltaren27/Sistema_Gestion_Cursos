const inscripcionesService = require('../services/inscripciones.service')

async function getInscripciones(req, res, next) {
    try {
        const inscripciones = await inscripcionesService.getInscripciones(req.usuario);
        res.json({ inscripciones });

    } catch (error) {
        next(error);
    }
}

async function getInscripcionById(req, res, next) {
    try {
        const id = Number(req.params.id);
        const inscripcion = await inscripcionesService.getInscripcionById(id, req.usuario);
        res.json({ inscripcion });
        
    } catch (error) {
        next(error);
    }
}
async function createInscripcion(req, res, next) {
    try {
        const inscripcion = await inscripcionesService.createInscripcion(req.usuario, req.body);
        res.status(201).json({ inscripcion });

    } catch (error) {
        next(error);
    }
}

async function removeInscripcion(req, res, next) {
    try {
        const id = Number(req.params.id);
        const inscripcion = await inscripcionesService.removeInscripcion(id);
        res.json({ inscripcion });

    }
    catch (error) {

        next(error)
    }

}

module.exports = { getInscripciones, getInscripcionById, createInscripcion, removeInscripcion };