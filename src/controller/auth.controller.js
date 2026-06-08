const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { SECRET } = require('../middleware/auth.middleware');
const userRepo = require('../repositories/usuarios.repository');
const { AppError } = require('../errors/AppError');

async function login(req, res, next) {
    try {
        const { email, password } = req.body;
        const user = await userRepo.findByEmail(email);

        if (!user) throw new AppError('Credenciales inválidas', 401);

        const verifyPassword = await bcrypt.compare(password, user.password);
        if (!verifyPassword) throw new AppError('Credenciales inválidas', 401);

        const token = jwt.sign({ id: user.id, email: user.email, nombre: user.nombre }, SECRET, { expiresIn: '1h' });
        res.json({ token, usuario: { id: user.id, nombre: user.nombre, email: user.email } });

    }
    catch (error) {
        next(error);
    }
}

async function register(req, res, next) {
    try {
        const { nombre,email,password } = req.body;  
        const exist = await userRepo.findByEmail(email);

        if (exist) throw new AppError('El email ya está registrado',409 );
        
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await userRepo.create(nombre, email, hashedPassword);
        const token = jwt.sign({ id: newUser.id }, SECRET, { expiresIn: '1h' });
        res.status(201).json({ usuario: newUser, token });


    }
    catch (error) {
        next(error);
    }
}
module.exports = { login, register };