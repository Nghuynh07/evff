const express = require('express');
const app = express();
const productRouter = require('./routes/productRoutes');
const userRouter = require('./routes/userRoutes');

//Middleware
if (process.env.NODE_ENV === 'development') {
  const morgan = require('morgan');
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use(function (req, res, next) {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/products', productRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'Failed',
    message: `Cannot find ${req.originalUrl} on this server!`,
  });
  next();
});

module.exports = app;
