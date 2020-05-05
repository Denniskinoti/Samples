const User = require('../model/auth');
const bcrypt = require('bcrypt')

const Signup = (req, res, next) => {
	req.check('name','name cannot be empty').notEmpty();
	req.check('email','invalid email address').isEmail();
	req.check('password','invalid password').isLength({min:4});

	const errors = req.validationErrors();
	if(errors) {
		req.session.errors = errors
	}
	bcrypt.hash(req.body.password, 10) .then(
			(hash) => {
				const user =new User ({
					name:req.body.name,
					email: req.body.email,
					password: hash
				});

				user.save().then(
						() => {
							res.render('landing',{user})
							req.session.errors = null
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
};


module.exports = {Signup}
