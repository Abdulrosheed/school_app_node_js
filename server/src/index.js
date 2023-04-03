const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config/config');
const dotenv = require('dotenv');

const logger = require('./config/logger');

dotenv.config({path : '../../.env'})

let server;
mongoose.connect("mongodb+srv://admin:admin12345@cluster0.x9x0bmj.mongodb.net/users?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  logger.info('Connected to MongoDB');
  server = app.listen(3000, () => {
    logger.info(`Listening to port ${3000}`);
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
