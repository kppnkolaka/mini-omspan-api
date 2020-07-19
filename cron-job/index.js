const cron = require('node-cron');
const configs = require('../models/configs');
const PaguMinus = require('../models/pagu-minus');
const rekonInternal = require('./jobs/rekon-internal');
const PaguMinusJob = require('./jobs/pagu-minus');

const cronJob = () => {
  const minute = configs.clock.minute;
  const paguminusClock = configs.hour.clock.paguminus;
  const rekonClock = configs.hour.clock.rekon;

  paguminusClock.forEach(element => {
    cron.schedule(`${minute} ${element} * * *`, () => {
      PaguMinus.del();
      PaguMinusJob.getPaguMinus();
      console.log('Pagu Minus');
    },{
      scheduled: true,
      timezone: 'Asia/Singapore'
    });
  });

  rekonClock.forEach(element => {
    cron.schedule(`${minute} ${element} * * *`, () => {
      rekonInternal();
      console.log('Rekon Internal');
    },{
      scheduled: true,
      timezone: 'Asia/Singapore'
    });
  });
}

module.exports = cronJob;