const express = require('express');
const { createServer } = require('http');
const loggerHTTP = require('morgan');
const mongoose = require('mongoose');
const dotENV = require('dotenv');
require('colors');

const app = express();
const server = createServer(app);

dotENV.config({ path: './config/config.env' });

if (process.env.NODE_ENV === 'development') app.use(loggerHTTP('dev'));

app.use('', (req, res, next) => res.status(200).send('Hello World!'));

async function init() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    if (conn) {
      console.log(`mongodb connection successful!!`.cyan);
      server.listen(process.env.PORT | 5000, () =>
        console.log(
          `server running on ${process.env.NODE_ENV} mode on port ${process.env
            .PORT | 5000}!!`.black.bgWhite
        )
      );
    }
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

init();
