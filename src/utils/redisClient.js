const logger = require('./logger')
const redis = require('redis');

const redisClient = redis.createClient({
  url: process.env.REDIS_URL
});

redisClient.on('error', (err) => {
    
  logger.error('Redis Client Error', err);
  console.error('Redis Client Error', err);
});

async function connectRedis() {
  await redisClient.connect();
  console.log('Connected to Redis');
}

module.exports = {
  redisClient,
  connectRedis,
};
