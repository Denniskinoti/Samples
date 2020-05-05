const User = require('../model/user');
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');

// const register = (req,res) => {
// 	let firstname = req.body.firstname;
// 	let lastname = req.body.lastname;
// 	let email = req.body.email;
// 	let password = req.body.password;
// 	let password2 = req.body.password2;;
	
// 	req.checkBody('firstname','firstname cannot be empty').notEmpty()
// 	req.checkBody('lastname','lastname cannot be empty').notEmpty()
// 	req.checkBody('email','email invalid ').isEmail();
// 	req.checkBody('password','password cannot be empty').isLength({min:5});
// 	if(password != password2) {
// 		req.flash('errors','password do not match');
// 		res.render('home/singup',{messages:req.flash('errors'),firstname:req.body.firstname,lastname:req.body.lastname,email:req.body.email})			
// 	}

// 	var errors = req.validationErrors();
// 				if(errors) {
// 					var messages = [];
// 					errors.forEach(function(error) {
// 							messages.push(error.msg)
// 						})	
// 						req.flash('errors',messages)
// 						console.log(messages)
// 					res.render('home/singup',{messages:req.flash('errors'),firstname:req.body.firstname,lastname:req.body.lastname,email:req.body.email})			
// 				}	

	
// 		User.findOne({email:email})
// 		.then(user => {
// 			if(user)   {
// 				req.flash('errors',"Email is arleady taken");
// 				res.render('home/singup',{
// 					firstname,lastname,email,password,password2,messages:req.flash('errors')
// 				})
// 			}else {
				
// 				bcrypt.hash(req.body.password, 10).then((hash)=> {
// 					const user = new User({
// 						firstname,
// 						lastname,						
// 						email,						
// 						password:hash
// 					});

// 					console.log('the hash is: ',hash)
						
// 					user.save().then(
// 						()=>{
// 							req.flash('success','your now registered! login')							
// 							 // res.redirect('/users/home_page')
// 							 console.log(user)
// 							 res.render('home/homepage',{messages:req.flash('success')})
							
// 						}).catch((error)=>{
// 							throw error
// 						})
// 				}).catch((error)=> {
// 					throw error
// 				})
// 			}
// 		})
// 	}



const register = (req,res) => {
	
	
	const {firstname, lastname,email, password,password2} = req.body;
	let errors = [];

	if(!firstname || !lastname || !email ||  !password || !password2) {
		errors.push({message: "please fill in all the requirements"})
	}
	
	if(password !== password2) {
		errors.push({message: "password do not match"})
	}

	if(password.length < 6) {
		errors.push({message: "password cannot be less than 6 characters"})
	}

	if(errors.length > 0) {
		res.render('home/singup',{
			errors,firstname,lastname, email,phone_number, password, password2
		})
	} else {
		User.findOne({email:email})
		.then(user => {
			if(user)   {
				errors.push({message:"Email is arleady taken"});
				res.render('home/singup',{
					errors,firstname, lastname,email,phone_number, password, password2
				})
			}else {
				
				bcrypt.hash(req.body.password, 10).then((hash)=> {
					const user = new User({
						firstname,
						lastname,						
						email,						
						password:hash
					});
					
					user.save().then(
						()=>{
							req.flash('success','your now registered! login')							
							 // res.redirect('/users/home_page')
							 console.log(user)
							 res.redirect('/user/home')
							
						}).catch((error)=>{
							throw error
						})
				}).catch((error)=> {
					throw error
				})
			}
		})
	}
		
}

//logout module
const logout = (req,res)=> {
	req.logout();
	req.flash('sucess',"your are logged out");
	res.redirect('/');
}


module.exports= {register,logout};
