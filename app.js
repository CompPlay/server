var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var index = require('./routes/index');
var login = require('./routes/login');
var register = require('./routes/register');
var logout = require('./routes/logout');
var my_profile = require('./routes/my_profile');

var app = express();

mongoose.connect('mongodb://heroku_919pg489:g4ka59dedu2h3rf9t3ollo101n@ds061391.mongolab.com:61391/heroku_919pg489');

/*

Hostname:   us-cdbr-azure-east-b.cloudapp.net
Username:   b0e812d8bf4e3e
Password:   124f7801
Database:   complaydb

*/

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('env');

// app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'lmaoitslit', resave: true, saveUninitialized: false, cookie: { maxAge : 3600000 } }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

// passport config lmao
var User = require('./models/User');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(function(user, done){
    done(null, user._id)
});
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
    done(err, user);
    });
});

/* ROUTES */
app.use('/', index);
app.use('/login', login);
app.use('/register', register);
app.use('/logout', logout);
app.use('/my_profile', my_profile);


app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;