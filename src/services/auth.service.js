const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { JWT_SECRET } = require('../config/env');
const userRepo = require('../repositories/usuarios.repository');
const { AppError } = require('../errors/AppError');

async function login(email, password) {

        const user = await userRepo.findByEmail(email);

        if (!user) throw new AppError('Credenciales inválidas', 401);

        const verifyPassword = await bcrypt.compare(password, user.password);
        if (!verifyPassword) throw new AppError('Credenciales inválidas', 401);

        const token = jwt.sign({ id: user.id, email: user.email, nombre: user.nombre, rol: user.rol }, JWT_SECRET, { expiresIn: '1h' });

        return{usuario:{ id: user.id, nombre: user.nombre, email: user.email, rol: user.rol},token}

}

async function register(nombre, email, rol, password) {

        const exist = await userRepo.findByEmail(email);

        if (exist) throw new AppError('El email ya está registrado', 409);

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await userRepo.create(nombre, email, rol, hashedPassword);
        const token = jwt.sign({ id: newUser.id, email: newUser.email, nombre: newUser.nombre, rol: newUser.rol }, JWT_SECRET, { expiresIn: '1h' });
        
        return{ usuario: newUser, token };

}
module.exports = { login, register };