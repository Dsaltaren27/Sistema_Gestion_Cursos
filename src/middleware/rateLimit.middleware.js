const rateLimit = require('express-rate-limit');
const { AppError } = require('../errors/AppError');

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next) => {
    next(new AppError('Demasiados intentos. Intenta de nuevo en unos minutos.', 429));
  }
});

module.exports = { authLimiter };