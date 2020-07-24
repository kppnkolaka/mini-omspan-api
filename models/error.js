const RedisClient = require('../services/redis');
const redisClient = require('../services/redis');

const KEY = 'error';

exports.get = () => {
  return redisClient.get(KEY).then(res => {
    return JSON.parse(res);
  })
}

exports.set = data => {
  redisClient.set(KEY, JSON.stringify(data));
}