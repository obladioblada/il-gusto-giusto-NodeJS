let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');

let bodyParser = require('body-parser');
let mangoose = require('mongoose');
let session = require('express-session');
let app = express();
let passport = require('passport');
let flash = require('connect-flash');



app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


// setting end points routes
let appRoutes = require('./routes/app');
let userRoutes = require('./routes/user');
let commerceRoutes = require('./routes/commerce');
let braintreRoutes = require('./routes/braintree');

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
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({
    parameterLimit: 100000,
    limit: '50mb',
    extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// passport configuration
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());



app.use('/', appRoutes);
app.use('/user', userRoutes);
app.use('/products', commerceRoutes);
app.use('/braintree', braintreRoutes);


// catch 404 and forward to error handler (angular)
app.use(function(req, res, next) {
  res.render('index');
});

module.exports = app;
