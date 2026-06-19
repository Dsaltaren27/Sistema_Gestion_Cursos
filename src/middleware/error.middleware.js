const { stack } = require('../app');
const logger = require('../utils/logger')

function errorHandler(err, req, res, next) {

logger.error({
  message: err.message,
  stack: err.stack,
  method: req.method,
  url: req.originalUrl,
  ip: req.ip

});


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