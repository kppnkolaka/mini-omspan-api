const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const controllers = require('./controllers/index');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use('/auth', controllers.auth);

app.listen(port, () => console.log(`Using port ${port}`));