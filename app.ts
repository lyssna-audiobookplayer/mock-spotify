import express from 'express';
var cors = require('cors');
var path = require('path');
var logger = require('morgan');

var indexRouter = require('./routes');
var webApiRouter = require('./routes/web-api');

export const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', webApiRouter);
