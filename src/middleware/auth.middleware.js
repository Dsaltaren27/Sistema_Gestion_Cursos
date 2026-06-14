const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/env');
const {AppError} = require('../errors/AppError')


function CheckToken(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return next(new AppError('Token requerido',401));
  }


  const token = authHeader.split(' ')[1];

  if (!token) {

    return next(new AppError('Formato inválido. Usa: Bearer <token>',401))
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.usuario = payload;
    next();
  } catch (error) {
    
    return next(new AppError('Token inválido o expirado',401))
  }
}



module.exports = { CheckToken };