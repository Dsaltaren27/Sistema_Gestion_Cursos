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
    req.usuario = payload;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
}



module.exports = { CheckToken };