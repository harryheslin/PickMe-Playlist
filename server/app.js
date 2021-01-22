let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
const cors = require('cors');
require('dotenv').config()

let indexRouter = require('./routes/index');
let searchRouter = require('./routes/search');
let authenticatedRouter = require('./routes/authenticated');
let playlistRouter = require('./routes/playlist');
let saveRouter = require('./routes/save');

let app = express();

let SpotifyWebApi = require('spotify-web-api-node');


let spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFYCLIENTID,
  clientSecret: process.env.SPOTIFYCLIENTSECRET,
  redirectUri: process.env.SPOTIFYREDIRECT + '/authenticated'
});

app.locals.spotifyApi = spotifyApi;


app.use(cors({origin: true}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// view engine setup
//Get request occuring server side
app.use('/authenticated', authenticatedRouter); 

app.use(express.static('../client/build'))
app.get("*", function (req, res) {
res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.use('/', indexRouter);
app.use('/search', searchRouter);
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
