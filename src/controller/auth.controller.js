const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { SECRET } = require('../middlewares/auth.middleware');
const userRepo = require('../repositories/usuarios.middleware');

async function login(req, res, next) {
    try {
        const { username, password } = req.body;
        const user = await usuariosRepo.findByemail(email);

        const vertifypassword = await bcrypt.compare(password, user.password);
        if (!vertifypassword) throw new Error('Invalid credentials');

        const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: '1h' });
        res.json({ token });

    }
    catch (error) {
        next(error);
    }
}

async function register(req, res, next) {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newuser = await usuariosRepo.create({ username, password: hashedPassword });
        res.status(201).json(newuser);

        const token = jwt.sign({ id: newuser.id }, SECRET, { expiresIn: '1h' });
        res.json({ token });

    }
    catch (error) {
        next(error);
    }
}