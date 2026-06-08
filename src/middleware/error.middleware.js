function errorHandler(err, req, res, next) {
  // Log the error for debugging
  console.error(err);

  const status = err && err.statusCode ? err.statusCode : 500;
  const message = err && err.message ? err.message : 'Internal Server Error';

  res.status(status).json({ error: message });
}

module.exports = { errorHandler };
function errorHandler(err, req, res, next) {

  console.error(`[ERROR] ${err.message}`);
  console.error(err.stack);

  if (err.statusCode) {
    return res.status(err.statusCode).json({ 
      error: err.message 
    });
  }

  res.status(500).json({ 
    error: 'Error interno del servidor' 
  });
}

module.exports = { errorHandler };