const { AppError } = require('../errors/AppError');
const cursoRepo = require('../repositories/cursos.repository');

async function getCursos(req, res, next) {
    try {
        const cursos = await cursoRepo.findAll()
        res.json({ cursos })

    }
    catch (error) {
        next(error)
    }
}

async function getCursoById(req, res, next) {
    try {
        const curso = await cursoRepo.findById(Number(req.params.id))

        if (!curso) throw new AppError('curso no encontrado', 404)
        res.json({ curso })

    }
    catch (error) {

        next(error)
    }
}

async function createCurso(req, res, next) {
    try {
        const { nombre, descripcion, profesor_id } = req.body;

        const newCurso = await cursoRepo.create(nombre, descripcion, profesor_id);
        res.status(201).json({ curso: newCurso });

    }
    catch (error) {

        next(error)
    }

}

async function updateCurso(req, res, next) {
    try {
        const curso = await cursoRepo.findById(Number(req.params.id))

        if (!curso) throw new AppError('curso no encontrado', 404)

        const { nombre, descripcion, profesor_id } = req.body;


        const cursoUpdate = await cursoRepo.update(Number(req.params.id), nombre, descripcion, profesor_id);

        res.json({ curso: cursoUpdate });

    }
    catch (error) {

        next(error)
    }

}

async function removeCurso(req, res, next) {
    try {
        const curso = await cursoRepo.findById(Number(req.params.id))

        if (!curso) throw new AppError('curso no encontrado', 404)


        const cursoRemove = await cursoRepo.remove(Number(req.params.id));

        res.json({ curso: cursoRemove });

    }
    catch (error) {

        next(error)
    }

}


module.exports = { getCursos, getCursoById, createCurso, updateCurso, removeCurso };