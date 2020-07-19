process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const axios = require('axios');
const querystring  = require('querystring');
const User = require('../models/user');
const { getJwtToken } = require('../api');

const authenticate = async data => {
  if(!data){
    const user = await User.get();
    data = querystring.stringify({ userid: user.userid, password: user.password })
  }

  return axios({
    method: 'post',
    url: getJwtToken,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data
  }).then( response => {
    User.set({username: response.data.data.username});
    return response.data;
  });
};

module.exports = authenticate;