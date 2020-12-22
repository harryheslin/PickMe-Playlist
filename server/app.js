var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var indexRouter = require('./routes/index');
var searchRouter = require('./routes/search');
var userRouter = require('./routes/user');
var authenticatedRouter = require('./routes/authenticated');
let playlistRouter = require('./routes/playlist');
let saveRouter = require('./routes/save');

var app = express();

var SpotifyWebApi = require('spotify-web-api-node');


let spotifyApi = new SpotifyWebApi({
  clientId: '335c98b88aa9432a964557058c3b2bc6',
  clientSecret: '3af086ecdc724a52a909e8f4fd401159',
  redirectUri: 'http://localhost:3010/authenticated'
});
app.locals.spotifyApi = spotifyApi;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({origin: true}));

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/search', searchRouter);
app.use('/authenticated', authenticatedRouter);
app.use('/playlist', playlistRouter);
app.use('/save', saveRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
