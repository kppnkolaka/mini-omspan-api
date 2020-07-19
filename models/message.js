const RedisClient = require('../services/redis');

// const schema = {
//   error: false,
//   err_num: 0,
//   time: 0
// }

exports.get = key => {
  return RedisClient.hgetall(key).then(res => {
    return res;
  });
}

exports.set = (key, value) => {
  RedisClient.hset(key, value);
}