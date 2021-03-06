const User = require('../model/user');

const isAdmin = (req,res,next) =>{
	if(req.user.role != 'admin') {
		res.send('Access denied admin section')
	}
	next();
}

//check if the user is logged in

const allowIfLoggedin = (req, res, next) => {
		if(req.isAuthenticated()) {
				return next();
		}
			console.log('not isAuthenticated')	
		res.redirect('/')
	}

module.exports = {isAdmin,allowIfLoggedin}