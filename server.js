const mongoose = require('mongoose');
require('dotenv').config();

process.on('uncaughtException', (err) => {
  console.log(err);
  console.log('UNCAUGHT EXCEPTION 🎇 SHUTTING DOWN');
  process.exit(1);
});

const port = process.env.PORT || 4000;
const app = require('./app');

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB Connection successful'));

const server = app.listen(port, () => console.log(`Port ${port} connected`));

//handling ASYNCHRONOUS unhandled rejection
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION 🎇 SHUTTING DOWN');
  server.close(() => {
    process.exit(1);
  });
});
