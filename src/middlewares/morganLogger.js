const morgan = require('morgan');
const logger = require('../utils/logger');

function morganLogger() {
  const env = process.env.NODE_ENV || 'development';

  console.log(env);
  

  if (env === 'production') {
    return morgan('combined', {
      stream: {
        write: (message) => logger.info(message.trim()) // log a winston
      }
    });
  } else {
    return morgan('dev');
  }
}

module.exports = morganLogger;
