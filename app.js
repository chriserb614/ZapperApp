// standard requires
var createError = require('http-errors'),
    express = require('express'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    mongo = require('mongodb'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    multer = require('multer'),
    upload = multer({dest: './uploads'}),
    methodOverride = require('method-override');

// local requires
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var workRouter = require('./routes/work');
var reviewRouter = require('./routes/reviews');
var User = require('./models/userModel');
var Work = require('./models/workModel');
var Critique = require('./models/critiqueModel');

// initialize express
var app = express();

// connect to db
mongoose.connect("mongodb://localhost/zapper1");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('uploads'));
app.use(methodOverride("_method"));

// passport config
app.use(require('express-session')({
  secret: "Rusty is cute",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.locals.moment = require('moment');

// router middleware
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/work', workRouter);
app.use('/reviews', reviewRouter);
app.use('/uploads', express.static('uploads'));

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

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
