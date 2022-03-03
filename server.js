const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log(err);
  console.log('UNCAUGHT EXCEPTION 🎇 SHUTTING DOWN');
  process.exit(1);
});

const port = process.env.PORT || 4000;
dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
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
