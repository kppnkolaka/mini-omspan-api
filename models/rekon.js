const RedisClient = require('../services/redis');
const KEY = 'rekon';

exports.get = () => {
  return RedisClient.get(KEY).then(res => {
    return JSON.parse(res);
  });
}

exports.set = rekonData => {
  // TODO: error handling
  return RedisClient.set(KEY, JSON.stringify(rekonData)).then(res => {
    return res;
  });
}

// const mongoose = require('mongoose');

// const rekonSchema = mongoose.Schema({
//   kategori: String,
//   jumlah: Number,
//   url: String
// });

// module.exports = mongoose.model('Rekon', rekonSchema);