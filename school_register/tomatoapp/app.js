var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var cors = require('cors');
var mysql = require('mysql');

var con = require('./db');
var app = express();

// routes
var login = require('./routes/login');
var adminpanel = require('./routes/adminpanel');
var dbtest = require('./routes/dbtest');
var usrpanel = require('./routes/usrpanel');

var isAuthenticated = require('./middlewares/isAuthenticated');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
// work in progress layout for every view
// app.set('view options', {layout: 'wip-layout'});

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('common'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'secret' }));
//app.use(isAuthenticated);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', login);
app.use('/dbtest', dbtest);
app.use('/adminpanel', adminpanel);
app.use('/usrpanel', usrpanel);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
