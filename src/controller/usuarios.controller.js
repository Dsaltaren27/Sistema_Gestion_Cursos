const { AppError } = require('../errors/AppError');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/env');
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
        const { nombre, email, rol, password } = req.body;
        const exist = await userRepo.findByEmail(email);
        if (exist) throw new AppError('El email ya está registrado', 409);

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await userRepo.create(nombre, email, rol, hashedPassword);
        const token = jwt.sign({ id: newUser.id, email: newUser.email, nombre: newUser.nombre, rol: newUser.rol }, JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ usuario: newUser, token });
    } catch (error) {
        next(error);
    }
}

module.exports = { getUser, getUserById, createUser };