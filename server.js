const express = require('express');
const { createServer } = require('http');
const loggerHTTP = require('morgan');
const dotENV = require('dotenv');

// Mongo Connection
const db = require('./config/db');

const app = express();
const server = createServer(app);

dotENV.config({ path: './config/config.env' });

// Establish Mongo Connection
db(server);

if (process.env.NODE_ENV === 'development') app.use(loggerHTTP('dev'));

app.use('', (req, res, next) => res.status(200).send('Hello World!'));

module.exports = app;
