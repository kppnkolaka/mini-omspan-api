const RedisClient = require('../services/redis');
const KEY = 'paguminus';
const KEY_DESC = 'paguminus_desc';

exports.get = () => {
  return RedisClient.lrange(KEY, 0, -1).then( res => {
    return res.map(JSON.parse);
  });
}

exports.set = paguMinusList => {
  RedisClient.rpush(KEY, JSON.stringify(paguMinusList));
}

exports.del = () => {
  RedisClient.del(KEY);
  RedisClient.del(KEY_DESC);
}

exports.setDesc = (key, value) => {
  // let schema = {
  //   'err': false,  resolved promise all
  //   'err_num': 0,  catch promise all
  //   'time': 0     resolved promise all
  // }

  RedisClient.hset(KEY_DESC, key, value);
}

exports.getDesc = () => {
  return RedisClient.hgetall(KEY_DESC).then(res => {
    return res;
  });
}

exports.incrDesc = () => {
  RedisClient.hincrby(KEY_DESC, 'err_num', 1);
}