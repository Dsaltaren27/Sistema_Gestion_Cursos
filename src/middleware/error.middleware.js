const logger = require('../utils/logger')

function errorHandler(err, req, res, next) {

  const isOperational = err.statusCode && err.statusCode < 500;

  if (isOperational) {
    logger.warn({
      message: err.message,
      method: req.method,
      url: req.originalUrl,
      ip: req.ip
    });
  } else {
    logger.error({
      message: err.message,
      stack: err.stack,
      method: req.method,
      url: req.originalUrl,
      ip: req.ip
    });
  }

  if (err.statusCode) {
    return res.status(err.statusCode).json({
      error: err.message
    });
  }

  return res.status(500).json({
    error: 'Error interno del servidor'
  });
}

module.exports = { errorHandler };