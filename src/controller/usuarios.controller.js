const { AppError } = require('../errors/AppError');
const userRepo = require('../repositories/usuarios.repository');

async function getUser(req, res, next) {
    try {
        const usuarios = await userRepo.findAll();
        res.json({ usuarios });
    } catch (error) {
        next(error);
    }
}

async function getUserById(req, res, next) {
    try {
        const id = Number(req.params.id);
        const usuario = await userRepo.findById(id);
        if (!usuario) throw new AppError('Usuario no encontrado', 404);
        res.json({ usuario });
    } catch (error) {
        next(error);
    }
}

async function createUser(req, res, next) {
    try {
        const { nombre, email, password } = req.body;
        const exist = await userRepo.findByEmail(email);
        if (exist) throw new AppError('El email ya está registrado', 409);
        const newuser = await userRepo.create(nombre, email, password);
        res.status(201).json({ usuario: newuser });
    } catch (error) {
        next(error);
    }
}

module.exports = { getUser, getUserById, createUser };