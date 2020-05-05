var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const formatMessage = require('./utils/messages');
const {getRoom,userJoin,getCurrentUser,userLeave} = require('./utils/users')



var http = require('http');
var socketIo = require('socket.io');

var app = express();

const server = http.createServer(app)
const io = socketIo(server);

const naame = 'User'

//run whenever a client connects
io.on('connection',socket=> {
  socket.on('joinRoom',({username,room})=>{
    var user = userJoin(socket.id, username,room);
    socket.join(user.room);

    console.log('this is the user room',user.room)
    console.log('new web server connection...');
    //welcome current user
  socket.emit('message',formatMessage(naame,'welcome to charcotf'));
  // broadcast when a user connects
   const k = socket.broadcast.to(user.room).emit('message',formatMessage(naame,`a ${user.username}  has joined the chat`));

   //updates the room when a user joins
   io.to(user.room).emit('roomUsers',{
    room: user.room,
    users:getRoom(user.room)
  })
  
  }) ;
  
 

    //listen to chat messages
    socket.on('chatMessage',msg => {
      const user = getCurrentUser(socket.id);
      const m = io.to(user.room).emit('message',formatMessage(user.username,msg));
      //io.to(user.room).emit('message',formatMessage('user',msg))
    })


  //runs when the client disconnects
  socket.on('disconnect',()=> {
    const user = userLeave(socket.id);
    if(user) {
      io.to(user.room).emit('message',formatMessage(naame,`${user.username}  has left the chat`))

      io.to(user.room).emit('roomUsers',{
        room: user.room,
        users:getRoom(user.room)
      })
    }   
  });
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

server.listen(8000,(err)=> {
  if(err) {
    console.log('server connection error',err)
  }
  console.log('server successfully connected');
})
