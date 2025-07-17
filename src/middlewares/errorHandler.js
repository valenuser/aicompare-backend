const logger = require('../utils/logger');

function errorHandler(err, req, res, next) {
  const statusCode = typeof err.statusCode === 'number' ? err.statusCode : 500;
  const status = err.status || 'error';

  logger.error(`${err.message} - ${req.method} ${req.originalUrl} - ${req.ip}\n${err.stack}`);

  res.status(statusCode).json({
    status,
    message: err.isOperational ? err.message : 'Something went wrong!',
  });
}


module.exports = errorHandler;
