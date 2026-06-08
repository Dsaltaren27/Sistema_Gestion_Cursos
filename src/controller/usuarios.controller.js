const userRepo = require('../repositories/usuarios.repository');

async function getUser(req, res, next) {
    try {
        const user = await userRepo.findAll()
        res.json({ usuarios })

    }
    catch (error) {
        next(error)
    }

}

async function getUserById(req, res, next) {
    try {
        const userById = await userRepo.findById(Number(req.params.id))

        if (!userById) throw new Error('user no find', 404)
        res.json({ usuario })

    }
    catch (error) {

        next(error)
    }

}

async function createUser(req, res, next) {

    try {
        const { username, password } = req.body;

        const exist = await userRepo.findByEmail(email);
        if (exist) throw new AppError('El email ya está registrado', 409);
        const newuser = await userRepo.create(nombre, email, password);
        res.status(201).json({ usuario: newuser });

    } catch (error) {
        next(error);
    }

}