const express = require('express');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const jwt = require('jsonwebtoken');

const path = require('path')

const User = require('./models/user')

const routes = require('./routes/routes.js');




const app = express();


const PORT = process.env.PORT || 3000;



mongoose.connect('mongodb://localhost:27017/access_control',{useNewUrlParser:true})
//body-parser middleware but in express
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json());

app.set('view engine','ejs')

app.use(async (req, res, next) => {

 if (req.headers["x-access-token"]) {

  const accessToken = req.headers["x-access-token"];

  const { userId, exp } = await jwt.verify(accessToken, process.env.JWT_SECRET);

  // Check if token has expired

  if (exp < Date.now().valueOf() / 1000) { 

   return res.status(401).json({ error: "JWT token has expired, please login to obtain a new one" });

  } 

  res.locals.loggedInUser = await User.findById(userId); next(); 

 } else { 

  next(); 

 } });

app.get('/test',(req,res)=> {
	res.render('user_register')
})

app.get('/login',(req,res)=> {
	res.render('user_login')
})

app.use('/', routes);



app.listen(8080,(err,good)=> {
	if(err) {
		console.log('server error')
	}
	console.log('server good')
})