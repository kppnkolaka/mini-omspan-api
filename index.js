const express = require('express');
const cors = require('cors');
const cronJob = require('./cron-job/index');
const dbConnection = require('./configs/mongoose');
const redisClient = require('./services/redis');
const bodyParser = require('body-parser');
const controllers = require('./controllers/index');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// dbConnection();

redisClient.on('connect', () => {
  console.log('Redis connected');
});

redisClient.on('error', () => {
  console.log('Redis connection failed');
});

cronJob();

app.use('/auth', controllers.auth);
app.use('/seed', controllers.seeding);
app.use('/rekon', controllers.rekon);
app.use('/pagu-minus', controllers.pagu_minus);

app.listen(port, () => console.log(`Using port ${port}`));