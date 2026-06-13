const authService = require('../services/auth.service')

async function login(req, res, next) {
    try {
        const { email, password } = req.body;
        const result = await authService.login(email,password);
        res.json(result);

    }
    catch (error) {
        next(error);
    }
}

async function register(req, res, next) {
    try {
        const { nombre, email, password, rol } = req.body;
        const result = await authService.register(nombre, email, rol, password);

        res.status(201).json(result);

    }
    catch (error) {
        next(error);
    }
}
module.exports = { login, register };