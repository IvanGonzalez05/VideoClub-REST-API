const path = require('path');
const morgan = require('morgan');
const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cookieParser = require('cookie-parser');

// ROUTERS
const itemRouter = require('./routes/itemRoutes');
const actorRouter = require('./routes/actorRoutes');
const genreRouter = require('./routes/genreRoutes');
const itemTypeRouter = require('./routes/itemTypeRoutes');
const languageRouter = require('./routes/languageRoutes');
const customerRouter = require('./routes/customerRoutes');
const employeeRouter = require('./routes/employeeRoutes');
const rentAndReturnRouter = require('./routes/rentAndReturnRoutes');

// ERROR HANDLERS
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

app.use(morgan('dev'));

// set the view engine to pug
app.set('view engine', 'pug');

// tells express where to find the views
app.set('views', path.join(__dirname, 'views'));

// telling express the static files will be on the public folder
app.use(express.static(path.join(__dirname, 'public')));

// helmet sets some security headers
app.use(helmet());

// limiting the amount of request a certain IP can make
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour',
});
app.use('/', limiter);

// limiting the size of the json can be received
app.use(express.json({ limit: '10kb' }));

// allows the server to access data sent by a form
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// using a cookie parser to get data from cookies
app.use(cookieParser());

// data sanitization against NoSQL query injection
app.use(mongoSanitize());

// data sanitization against XSS atacks
app.use(xss());

// ROUTES
app.use('/item', itemRouter);
app.use('/genre', genreRouter);
app.use('/actor', actorRouter);
app.use('/customer', customerRouter);
app.use('/language', languageRouter);
app.use('/item-type', itemTypeRouter);
app.use('/employee', employeeRouter);
app.use('/rent', rentAndReturnRouter);

app.all('*', (req, res, next) => {
    next(
        new AppError(
            `Cant find ${req.originalUrl} on this server. Checkout if the resource requested exists`,
            404
        )
    );
});

// error handler middleware
app.use(globalErrorHandler);

module.exports = app;
