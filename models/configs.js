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
  if(config === 'seed') {
    return RedisClient.set('configs', JSON.stringify(schema)).then(res => {
      return res;
    });
  }

  schema[Object.keys(config)[0]] = config[Object.keys(config)[0]];

  return RedisClient.set('configs', JSON.stringify(schema)).then(res => {
    return res;
  });
}

exports.get = () => {
  return RedisClient.get('configs').then(res => {
    return JSON.parse(res);
  });
}