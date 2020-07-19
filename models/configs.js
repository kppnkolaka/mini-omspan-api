const RedisClient = require('../services/redis');

const schema = {
  async_limit: {
    auth: 4,
    rekon: 2,
    paguminus: 2
  },
  clock: {
    minute: 1,
    hour: {
      rekon: [7, 14, 17],
      paguminus: [2]
    }
  }
}

exports.set = config => {
  const configs = schema[Object.keys(config)[1]];
  RedisClient.set('configs', JSON.stringify(configs));
}

exports.get = () => {
  return RedisClient.get('confifs').then(res => {
    return JSON.parse(res);
  });
}