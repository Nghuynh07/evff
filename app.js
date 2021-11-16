const express = require('express');
const app = express();
const morgan = require('morgan');
const productRouter = require('./routes/productRoutes');
const userRouter = require('./routes/userRoutes');

//Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(``));

app.use(function (req, res, next) {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/products', productRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
