const RedisClient = require('../services/redis');
const KEY = 'user';

exports.get = () => {
  return RedisClient.hgetall(KEY).then(res => {
    return res;
  });
}

exports.set = userData => {
  RedisClient.hset(KEY, userData);
}

// const mongoose = require('mongoose');

// const userSchema = mongoose.Schema({
//   userid: String,
//   password: String
// });

// module.exports = mongoose.model('User', userSchema);