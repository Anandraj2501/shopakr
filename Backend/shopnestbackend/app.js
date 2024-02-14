
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const productModel = require("./routes/users");
const userModel = require("./routes/userdata");
const actualUser = require("./routes/E-commerceUsers");
const session = require("express-session");
const cors = require("cors");


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const passport = require('passport');





var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(cors());
// Enable CORS middleware
app.use(cors({
  credentials: true,
  origin: "https://shopnest2.netlify.app"
}));

// Allow access to static images
app.use('/images', express.static(path.join(__dirname, 'public/images')));


app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: false,
}))
app.use(passport.initialize());
app.use(passport.session());

//for admins
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());


//for users
passport.serializeUser(actualUser.serializeUser());
passport.deserializeUser(actualUser.deserializeUser());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/addproduct", productModel);
app.use("/products", productModel);



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

