const landing = (req,res)=> {
	res.render('home/landing');
}

const singup = (req,res)=> {
	res.render('home/singup');
}


const login = (req,res)=> {
	res.render('home/login');
}

const home = (req,res)=> {
	res.render('home/homepage');
}


module.exports = {landing,singup,login,home}