var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mysql = require('mysql');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var con  = mysql.createConnection({
	host : 'localhost',
	user : 'test',
	password: ' '

})
// con.connect();

con.connect((err)=> {
	if(err) {
		console.log('mysql error connection ' , err)
		throw err
	}
	console.log('mysql successful connection')
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/createDb',(req,res)=> {
	let sql = 'CREATE DATABASE test';
	con.query(sql,(err,results)=> {
		if(err) {
			throw err
		}
		console.log(results)
		res.send(results)
	})
})


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

app.listen(3000,(err)=> {
	if(err) {
		console.log('server starting error ' ,err)
	}
	console.log('server successful started')
})
