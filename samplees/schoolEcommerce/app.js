var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const flash = require('connect-flash')
const validator = require('express-validator');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var usersRouter = require('./routes/users');
var indexRouter = require('./routes/index');

mongoose.connect('mongodb://localhost:27017/schoolEcommerce', {useNewUrlParser: true});
require('./config/passport')(passport);

//initializing passport


app.use(session({
  secret: 'dianasession',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

app.use(flash())




//using the expressing validator
app.use(validator())


app.use((req,res,next)=> {
 
  res.locals.currentUser = req.user;
  res.locals.info = req.flash('info')
  res.locals.error =  req.flash('error');
  res.locals.messages = req.flash('messages')


  next();
})

app.use('/', indexRouter);
app.use('/users', usersRouter);


//catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



//error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');

  
});





app.listen(process.env.PORT || '3000',function(err) {
	if(err) {
		console.log('server error')
	}else {
		console.log('server successfully connected')
	}
})

module.exports = app;
