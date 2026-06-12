function errorHandler(err, req, res, next) {

  console.error(`[ERROR] ${err.message}`);
  console.error(err.stack);

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