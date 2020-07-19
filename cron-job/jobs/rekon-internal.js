const tasks = require('../tasks');
const authenticate = require('../../services/authenticate');
const Request = require('../utils/http-request');
const Rekon = require('../../models/rekon');
const Message = require('../../models/message');

const rekonInternal = async () => {
  let token = '';

  await authenticate(null).then( res => {
    token = res.data.token;
  }).catch( err => {
    console.log('failed authentication');
  });

  let promisedResult = [];

  tasks.forEach(element => {
    promisedResult.push(Request.rekon(token, element));
  });

  let resolvedPromise = [];
  
  try {
    resolvedPromise = await Promise.all(promisedResult);
  } catch (error) {
    Message.set('rekon_msg', {error: true});
    Message.set('rekon_msg', {err_num: 1});
    Message.set('rekon_msg', {time: Date.now()});

    return error;
  }

  Message.set('rekon_msg', {error: false});
  Message.set('rekon_msg', {err_num: 0});
  Message.set('rekon_msg', {time: Date.now()});

  Rekon.set(resolvedPromise).then(res => {
    console.log(res);
  }).catch(err => {
    console.log(err);
  });
};

module.exports = rekonInternal;