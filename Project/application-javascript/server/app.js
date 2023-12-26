'use strict';
const dotenv = require('dotenv');
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
const cors = require('cors');
const route = require('./routes/index');

dotenv.config({
	path: `${__dirname}/.env`,
});

// let indexRouter = require('./routes/index');

let app = express();


// view engine setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
	origin: ['https://www.section.io', 'https://www.google.com/', 'http://localhost:3000']
}));

//Init route
route(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	res.status(err.status || 500);
});

module.exports = app;
