const express = require('express');
const Configs = require('../models/configs');
const CronJob = require('../cron-job/index');

const router = express.Router();

router.post('/', async (request, response) => {
  try {
    await Configs.set(request.body);
  } catch (error) {
    return response.status(500).send({ 'msg': 'something went wrong' });
  }

  CronJob.destroyCron();
  CronJob.startCron();

  return response.status(200).send({ 'msg': 'ok' });
});

router.get('/', async (request, response) => {
  let config = {};

  try {
    config = await Configs.get();
  } catch (error) {
    return response.status(500).send({ 'msg': 'something went wrong' });
  }

  return response.status(200).send({ 'msg': 'ok', 'data': config });
});

module.exports = router;