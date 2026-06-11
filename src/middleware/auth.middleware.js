const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/env');


function CheckToken(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ error: 'Token requerido' });
  }


  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Formato inválido. Usa: Bearer <token>' });
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.usuario = payload; // disponible en el controller
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
}

function validateLogin(req, res, next) {

  const { error } = loginSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      error: error.details[0].message
    });
  }

  next();

}

function validateRegister(req, res, next) {

  const { error } = registerSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      error: error.details[0].message
    });
  }

  next();

}

module.exports = { CheckToken, validateLogin, validateRegister };