const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { JWT_SECRET } = require('../config/env');
const userRepo = require('../repositories/usuarios.repository');
const { AppError } = require('../errors/AppError');
const logger = require('../utils/logger');

async function login(email, password) {

        logger.info(`Intento de login: ${email}`)
        const user = await userRepo.findByEmail(email);

        if (!user){ 
                
        logger.warn(`Login fallido - usuario no encontrado: ${email}`)
        throw new AppError('Credenciales inválidas', 401);
        
        }
        
        const verifyPassword = await bcrypt.compare(password, user.password);
        
        if (!verifyPassword){ 

        logger.warn(`Login fallido - contraseña incorrecta: ${email}`)        
        throw new AppError('Credenciales inválidas', 401);

        }
        const token = jwt.sign({ id: user.id, email: user.email, nombre: user.nombre, rol: user.rol }, JWT_SECRET, { expiresIn: '1h' });

        logger.info(`Login exitoso: ${email}`)

        return{usuario:{ id: user.id, nombre: user.nombre, email: user.email, rol: user.rol},token}

}

async function register(nombre, email, rol, password) {

        logger.info(`Intento de registro: ${email}`)
        const exist = await userRepo.findByEmail(email);

        if (exist){ 
                
                logger.warn(`Registro rechazado - email existente: ${email}`)
                throw new AppError('El email ya está registrado', 409);

        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await userRepo.create(nombre, email, rol, hashedPassword);
        const token = jwt.sign({ id: newUser.id, email: newUser.email, nombre: newUser.nombre, rol: newUser.rol }, JWT_SECRET, { expiresIn: '1h' });
        
        logger.info(`Usuario registrado: ${email}`);
        
        return{ usuario: newUser, token };

}
module.exports = { login, register };