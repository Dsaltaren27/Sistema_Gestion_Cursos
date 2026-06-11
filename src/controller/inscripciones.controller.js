const { AppError } = require('../errors/AppError');
const inscripRepo = require('../repositories/inscripciones.repository');

async function getInscripciones(req, res, next) {
    try {
        const inscripciones = await inscripRepo.findAll();
        res.json({ inscripciones });
    } catch (error) {
        next(error);
    }
}

async function getInscripcionById(req, res, next) {
    try {
        const id = Number(req.params.id);
        const inscripcion = await inscripRepo.findById(id);
        if (!inscripcion) throw new AppError('inscripcion no encontrado', 404);
        res.json({ inscripcion });
    } catch (error) {
        next(error);
    }
}
async function createInscripcion(req, res, next) {
    try {
        const { usuario_id, curso_id } = req.body;
        const newInscripcion = await inscripRepo.create(usuario_id, curso_id);
        res.status(201).json({ inscripcion: newIncripcion });
    } catch (error) {
        next(error);
    }
}

async function removeInscripcion(req, res, next) {
    try {
        const inscripcion = await inscripRepo.findById(Number(req.params.id))
        if (!inscripcion) throw new AppError('no hay inscripcion', 404)
        const inscripcionRemove = await inscripRepo.remove(Number(req.params.id));
        res.json({ inscripcion: inscripcionRemove });

    }
    catch (error) {

        next(error)
    }

}

module.exports= {getInscripciones,getInscripcionById,createInscripcion,removeInscripcion};