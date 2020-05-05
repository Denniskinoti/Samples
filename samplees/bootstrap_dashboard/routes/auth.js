const express = require('express');
const auth = require('../controller/auth');
const passport = require('passport')

const authRoute = express.Router();
function  userSignupValidator  (req,res,next) {
	req.check('name','Name is required').notEmpty()
	req.check('email','Email must be between 3 to 32 characters')
		.matches(/.+\@.+\../)
		.withMessage('email must contain @')
		.isLength({
			min: 4,
			max: 32
		});

	req.check('password','passed is required').notEmpty
	req.check('password')
		.isLength({min: 6})
		.withMessage('password must contain atleast 6 characters')
		.matches(/\d/) //must have atleast one digit and number
		.withMessage('password must contain a number');
	const errors = req.validationErrors() //this method grabs all the errors
	if(errors) { //goes through the errors and shows any error in the errors variable
		const firstError = errors.map(error => error.msg)[0];
		// return res.status(400).json({
		// 	error: firstError
		// });

		return res.render('auth',{errors:firstError,success:false})

	}
	next();

}

authRoute.post('/signup',userSignupValidator,auth.Signup);
authRoute.post('/login',(req,res,next)=> {
	passport.authenticate('local',{
		successRedirect : '/users/pages',
		failureRedirect: '/users/login'
		
	})(req,res,next);
	

})






module.exports = authRoute