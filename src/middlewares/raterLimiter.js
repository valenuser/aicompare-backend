const Redis = require('redis');
const  RedisStore  = require('rate-limit-redis').default;
const rateLimit = require('express-rate-limit');

const redisClient = Redis.createClient({
  url: process.env.REDIS_URL,
});
redisClient.connect().catch(console.error);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // limite de peticiones
  standardHeaders: true,
  legacyHeaders: false,
  store: new RedisStore({
    sendCommand: (...args) => redisClient.sendCommand(args),
  }),
  message: {
    status: 429,
    error: 'Too many requests, please try again later.',
  },
});

module.exports = limiter;
