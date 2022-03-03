const path = require('path');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// const rateLimit = require('express-rate-limit');

const compression = require('compression');

const AppError = require('./utils/appError');
const orderRouter = require('./routes/orderRoutes');
const globalErrorHandler = require('./controllers/errorController');
const productRouter = require('./routes/productRoutes');
const userRouter = require('./routes/userRoutes');
//GLOABL Middleware
const app = express();
//For security HTTP headers
app.use(helmet());
app.enable('trust proxy');
app.use(cors());
app.options('*', cors());

const publicPath = path.join(__dirname, 'public');

app.use(express.static(publicPath));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../front_end/build'));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

//Development logging
if (process.env.NODE_ENV === 'development') {
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
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
//data sanitization against NoSQL query injection
app.use(mongoSanitize());
//data sanitization against XSS
app.use(xss());
//serving static files

//Prevent parameter pollution
app.use(hpp());

//test middleware
app.use(function (req, res, next) {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});

app.use(compression());
//routes

// app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/users', userRouter);
// app.use('/api/v1/braintree', braintreeRouter);
app.use('/api/v1/orders', orderRouter);

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
