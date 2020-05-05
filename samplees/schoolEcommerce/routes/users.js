var express = require('express');
const passport = require('passport');
const auth = require('../controller/auth')
const User = require('../controller/users')
var authrouter = express.Router();



//singup post route

authrouter.post('/singup',User.register)

//login route

authrouter.post('/login',(req,res,next)=> {	

	passport.authenticate('local',{

		successRedirect : '/user/home',
		
		failureRedirect: '/',
		failureFlash : true,
		successFlash : "welcome to the site"
	})(req,res,next);	
	

});

authrouter.get('/logout',User.logout);

module.exports = authrouter;
