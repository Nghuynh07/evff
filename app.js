const express = require('express');
const app = express();
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const productRouter = require('./routes/productRoutes');
const userRouter = require('./routes/userRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const braintreeRouter = require('./routes/braintreeRoutes');
// const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
//GLOABL Middleware

//For security HTTP headers
app.use(helmet());

//Development logging
if (process.env.NODE_ENV === 'development') {
  const morgan = require('morgan');
  app.use(morgan('dev'));
}

// limit requests from same API
// const limiter = rateLimit({
//   max: '*',
//   windowMs: 60 * 60 * 1000,
//   message: 'Too many requests from this IP, please try again in an hour!',
// });

// app.use('/api', limiter);

//body parser, reading data from body into req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
//data sanitization against NoSQL query injection
app.use(mongoSanitize());
//data sanitization against XSS
app.use(xss());
//serving static files

//Prevent parameter pollution
app.use(hpp());

app.use(express.static(`${__dirname}/public`));

//test middleware
app.use(function (req, res, next) {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});
//routes
app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/braintree', braintreeRouter);

//unhandled routes
app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'Failed',
  //   message: `Cannot find ${req.originalUrl} on this server!`,
  // });
  // const err = new Error(`Cannot find ${req.originalUrl} on this server!`);
  // err.status = 'Failed';
  // err.statusCode = 404;

  next(new AppError(`Cannot find [${req.originalUrl}] on this server!`), 404);
});

app.use(globalErrorHandler);
module.exports = app;
