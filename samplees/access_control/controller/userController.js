const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {roles} = require('../roles')

exports.Singup = (req,res,next) => {
	console.log(req)
	bcrypt.hash(req.body.password, 10) .then(
			(hash) => {
				const user =new User ({
					email: req.body.email,
					role: req.body.role || "basic", 
					password: hash
				});

				const accessToken = jwt.sign({userId:user._id},"Random user authentication",{
					expiresIn : "24h"
				});

				user.accessToken = accessToken

				user.save().then(
						() => {
							
							accessToken
							// res.status(201).json({
							// 	data:user,
							// accessToken
							// })
							res.render('property')
						}


					).catch(
						(error) => {
							res.status(500).json({
								error: error
							})
						}
					)
			}
		)

}

exports.login = (req,res) => {

	User.findOne({email: req.body.email}).then(
		(user) => {
			if(!user) {
				return res.status(401).json({
					error: new Error ("user not found")
				});
			}
			bcrypt.compare(req.body.password, user.password).then(
				(valid) => {
					if(!valid) {
						return res.status(401).json({
							error : new Error("incorrect password")
						});
					}

					const token = jwt.sign({userId:user._id},'Random user authentication',{expiresIn:'24h'})
					res.status(200).json({
						userId: user._id,
						token: 'token'
					})
					console.log(userId)
					res.render('property')
				}
				).catch(
					(error) => {
						throw error
					}
				)
		}
		).catch(
			(error)=> {
				throw error
			}
		)
	
}

exports.getUsers = (req,res,next)=> {
	User.find({},(err,user)=> {
		if(err){
			console.log(err)
		}
		res.status(200).json({
			data: user
		})
	})
}


exports.getUser = async (req, res, next) => {

 try {

  const userId = req.params.userId;

  const user = await User.findById(userId);

  if (!user) return next(new Error('User does not exist'));

   res.status(200).json({

   data: user

  });

 } catch (error) {

  next(error)

 }

}

exports.updateUser = async (req, res, next) => {

 try {

  const update = req.body

  const userId = req.params.userId;

  await User.findByIdAndUpdate(userId, update);

  const user = await User.findById(userId)

  res.status(200).json({

   data: user,

   message: 'User has been updated'

  });

 } catch (error) {

  next(error)

 }

}


exports.deleteUser = async (req, res, next) => {

 try {

  const userId = req.params.userId;

  await User.findByIdAndDelete(userId);

  res.status(200).json({

   data: null,

   message: 'User has been deleted'

  });

 } catch (error) {

  next(error)

 }

}

exports.grantAccess = function(action, resource) {

 return async (req, res, next) => {

  try {

   const permission = roles.can(req.user.role);

   if (!permission.granted) {

    return res.status(401).json({

     error: "You don't have enough permission to perform this action"

    });

   }

   next()

  } catch (error) {

   next(error)

  }

 }

}

exports.allowIfLoggedin = async(req,res,next) => {
	try {
		const user = res.locals.loggedInUser
		if(!user) 
			return res.status(401).json({
				error: "you need to be logged in"
			})
		req.user = user;
		next();
	} catch(error) {
		next(error)
	}
}