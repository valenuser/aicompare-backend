const logger = require('../utils/logger');

function errorHandler(err, req, res, next) {
  // Si no es un error operativo, lo marcamos como 500
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // Loggear el error
  logger.error(`${err.message} - ${req.method} ${req.originalUrl} - ${req.ip}\n${err.stack}`);

  // Responder con mensaje
  res.status(err.statusCode).json({
    status: err.status,
    message: err.isOperational ? err.message : 'Something went wrong!',
  });
}

module.exports = errorHandler;
