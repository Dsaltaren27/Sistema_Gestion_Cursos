const userService= require('../services/usuarios.service')
async function getUser(req, res, next) {
    try {
        const usuarios = await userService.getUser();
        res.json({ usuarios });
    } catch (error) {
        next(error);
    }
}

async function getUserById(req, res, next) {
    try {
        const id = Number(req.params.id);
        const usuario = await userService.getUserById(id);
        res.json({ usuario });
    } catch (error) {
        next(error);
    }
}

async function createUser(req, res, next) {
    try {
        const { nombre, email, rol, password } = req.body;
        const result = await userService.createUser(nombre, email, rol, password)
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
}

module.exports = { getUser, getUserById, createUser };