const { AppError } = require('../errors/AppError');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/env');
const userRepo = require('../repositories/usuarios.repository');

async function getUser() {
    return await userRepo.findAll();
}

async function getUserById(id) {
    const usuario = await userRepo.findById(id);
    if (!usuario) throw new AppError('Usuario no encontrado', 404);
    return usuario;
}

async function createUser(nombre, email, rol, password) {
    const exist = await userRepo.findByEmail(email);
    if (exist) throw new AppError('El email ya está registrado', 409);

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userRepo.create(nombre, email, rol, hashedPassword);

    const token = jwt.sign(
        { id: newUser.id, email: newUser.email, nombre: newUser.nombre, rol: newUser.rol },
        JWT_SECRET,
        { expiresIn: '1h' }
    );

    return { usuario: newUser, token };
}

module.exports = { getUser, getUserById, createUser };