const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var passport = require('passport');
var Strategy = require('passport-twitter').Strategy;
var session = require('express-session');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./models/user');
const pugLoader = require('./util/lib/pugLoader');

passport.use(new Strategy({
  consumerKey: '8a28vEaa5F724MN3OUNBfxESt',
  consumerSecret: '80dtzI6CLsFuUvTx03TJl0PKDbh73RBre1WJenZ5957FAFg1jo',
  userProfileURL: "https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true",
  include_email: true,
  callbackURL: 'http://localhost:3000/twitter/return'
}, function (token, tokenSecret, profile, callback) {
  return callback(null, profile);
}));

passport.use(new GoogleStrategy({
  clientID: '285024062445-8jgkppjn3nce13sslg5a2f2jsj934hou.apps.googleusercontent.com',
  clientSecret: 'F9no_9bmZYcP82RRTzQYbHEk',
  include_email: true,
  callbackURL: "http://localhost:3000/auth/google/callback"
}, function (token, tokenSecret, profile, callback) {
  User.findOne({ extID: profile.id }).exec((err, user) => {
    if (err)
      return callback(err, {});
    if (user) {
      user.extToken = token;
      user.save((err, svd) => {
        callback(null, Object.assign({ token }, svd));
      });
    } else {
      user = new User();
      user.fullName = profile.displayName;
      user.extID = profile.id;
      user.extToken = token;
      user.email = profile.emails[0].value;
      user.save((err, svd) => {
        callback(null, Object.assign({ token }, svd));
      });
    }
  });
}));


passport.serializeUser(function (user, callback) {
  callback(null, user);
})

passport.deserializeUser(function (obj, callback) {
  callback(null, obj);
})


const view = require('./routes/view');
const api = require('./routes/api');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'whatever', resave: true, saveUninitialized: true }))

app.use(passport.initialize())
app.use(passport.session())

// 



app.get('/twitter/login', passport.authenticate('twitter'))

app.get('/twitter/return', passport.authenticate('twitter', {
  failureRedirect: '/'
}), function (req, res) {
  res.redirect('/')
})
//Google
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile','email'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

// Server routes
app.use('/', view);
app.use('/api', api);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
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
