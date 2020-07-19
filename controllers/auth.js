const express = require('express');
const User = require('../models/user');
const querystring  = require('querystring');
const authenticate  = require('../services/authenticate');

const router = express.Router();

router.post('/', async (request, response) => {
  const authData = querystring.stringify(request.body);
  const userExist = await User.get();
  // const userExist = await User.find({ userid: request.body.userid });

  if(!userExist.userid) {
    const user = {
      userid: request.body.username,
      password: request.body.password
    }

    User.set(user);
    // const user = new User({
    //   userid: request.body.userid,
    //   password: request.body.password
    // });

    // try {
    //   await user.save();
    // } catch (error) {
    //   return response.status(500).send({ 'msg': error.response });
    // }
  }

  let authResponse = '';

  try {
    authResponse = await authenticate(authData);
  } catch (error) {
    return response.status(500).send({ 'msg': 'something went wrong' });
  }

  return response.status(200).send(authResponse);    
});

module.exports = router;