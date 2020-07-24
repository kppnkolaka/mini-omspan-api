const seeder = require('../models/seeder');
const express = require('express');

const router = express.Router();

router.get('/', async (request, response) => {
  const seeding = await seeder();

  return response.status(200).send({ 'msg': seeding });
});

module.exports = router;