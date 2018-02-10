var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var mangoose = require('mongoose');
var app = express();
var passport = require('passport');
var flash = require('connect-flash');


app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


// setting end points routes
var appRoutes = require('./routes/app');
var userRoutes = require('./routes/user');
var commerceRoutes = require('./routes/commerce');

// connecting database
const db_PATH='mongodb://localhost:27017/db';
mangoose.connect(db_PATH);



require('./passportconfig')(passport); // pass passport for configuration

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// passport configuration
/*app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));*/
app.use(passport.initialize());
//app.use(passport.session());
app.use(flash());



app.use('/', appRoutes);
app.use('/user', userRoutes);
app.use('/products', commerceRoutes);


// catch 404 and forward to error handler (angular)
app.use(function(req, res, next) {
  res.render('index');
});

module.exports = app;
