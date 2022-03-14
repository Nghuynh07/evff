const express = require('express');
const app = express();
const path = require('path');
// const morgan = require('morgan');
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

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, './frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './frontend/build', 'index.html'));
  });

  app.use('/public', express.static(`${__dirname}/public`));
} else {
  app.get('/', (req, res) => {
    res.send('API running');
  });
}

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
app.enable('trust proxy');
app.use(cors());
app.options('*', cors());

app.use(compression());
//body parser, reading data from body into req.body
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
//data sanitization against NoSQL query injection
app.use(mongoSanitize());
//data sanitization against XSS
app.use(xss());
//Prevent parameter pollution
app.use(hpp());
//test middleware
app.use(function (req, res, next) {
  req.requestTime = new Date().toISOString();
  next();
});

console.log(process.env.NODE_ENV);

// app.use('/public', express.static('public'));
// app.use(express.static(`${__dirname}/public`));
app.use('/public', express.static('public'));

//For security HTTP headers
app.use(helmet());

//Development logging
// if (process.env.NODE_ENV === 'development') {
//   app.use(morgan('dev'));
// }

//routes
app.use('/api/v1/products', productRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/orders', orderRouter);

//unhandled routes
app.all('*', (req, res, next) => {
  next(new AppError(`Cannot find [${req.originalUrl}] on this server!`), 404);
});

app.use(globalErrorHandler);
module.exports = app;
