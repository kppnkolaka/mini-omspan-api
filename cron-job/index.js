const cron = require('node-cron');
const Configs = require('../models/configs');
const PaguMinus = require('../models/pagu-minus');
const rekonInternal = require('./jobs/rekon-internal');
const PaguMinusJob = require('./jobs/pagu-minus');

class CronJob {
  constructor() {
    this.jobs = [];
  }

  async startCron() {
    let config = {};

    try {
      config = await Configs.get();
    } catch (error) {
      console.log(error);
    }

    const { clock } = config;

    clock.hour.paguminus.forEach(element => {
      const job = cron.schedule(`${clock.minute} ${element} * * *`, () => {
        console.log('Pagu Minus');
        PaguMinus.del();
        PaguMinusJob.getPaguMinus();
      },{
        scheduled: true,
        timezone: 'Asia/Singapore'
      });

      this.jobs.push(job);
    });

    clock.hour.rekon.forEach(element => {
      const job = cron.schedule(`${clock.minute} ${element} * * *`, () => {
        rekonInternal();
        console.log('Rekon Internal');
      },{
        scheduled: true,
        timezone: 'Asia/Singapore'
      });

      this.jobs.push(job);
    });
  }

  destroyCron() {
    this.jobs.forEach(job => {
      job.destroy();
    })
  }
}

module.exports = new CronJob();
// const cronJob = async () => {
//   let config = {};

//   try {
//     config = await Configs.get();
//   } catch (error) {
//     console.log(error);
//   }

//   const { clock } = config;

//   clock.hour.paguminus.forEach(element => {
//     cron.schedule(`${clock.minute} ${element} * * *`, () => {
//       console.log('Pagu Minus');
//       PaguMinus.del();
//       PaguMinusJob.getPaguMinus();
//     },{
//       scheduled: true,
//       timezone: 'Asia/Singapore'
//     });
//   });

//   clock.hour.rekon.forEach(element => {
//     cron.schedule(`${clock.minute} ${element} * * *`, () => {
//       rekonInternal();
//       console.log('Rekon Internal');
//     },{
//       scheduled: true,
//       timezone: 'Asia/Singapore'
//     });
//   });
// }