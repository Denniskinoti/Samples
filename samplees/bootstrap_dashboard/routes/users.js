var express = require('express');
const User = require('../controller/user')
var router = express.Router();

/* GET users listing. */

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/users/',(req,res,next)=> {
	res.render('users')
})

router.get('/pages', function(req, res, next) {
  res.render('pages');
});

router.get('/landing',(req,res)=> {
	res.render('landing');
})

router.get('/signin',(req,res)=> {
	res.render('auth',{errors:''});
})


router.get('/login',(req,res)=> {
	res.render('login');
})

router.post('/landing',User.form);
router.get('/home',User.form2);


router.get('/maps',(req,res)=> {
	res.render('maps')
})

module.exports = router;
