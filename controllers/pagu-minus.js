const express = require('express');
const PaguMinus = require('../models/pagu-minus');

const router = express.Router();

router.get('/', async (request, response) => {
  let message = {};

  return Promise.all([PaguMinus.get(), PaguMinus.getDesc()]).then( res => {
    message['data'] = res[0];
    message['status'] = res[1];

    return response.status(200).send(message);
  }).catch( err => {
    return response.status(500).send({ 'msg': error.response });
  });
});

module.exports = router;