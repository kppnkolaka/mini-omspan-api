const express = require('express');
const Rekon = require('../models/rekon');
const Message = require('../models/message');

const router = express.Router();

router.get('/', async (request, response) => {
  let rekonData = [];
  let message = {};

  try {
    rekonData = await Rekon.get();
    message = await Message.get('rekon_msg');
    // rekonData = await Rekon.find();
  } catch (error) {
    return response.status(500).send({ 'msg': error.response });
  }
  
  return response.status(200).send({
    data: rekonData,
    message
  });
});

module.exports = router;