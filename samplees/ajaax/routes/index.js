var express = require('express');
const User = require('../model/sample');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/dog', function(req, res, next) {
	var dog = "german Shepherd"
  res.render('index', { title: 'Express' ,dog:dog});
});

//render form
router.get('/data', function(req, res, next) {
	
  res.render('data');
});

//post data to the db
router.post('/dataa',(req,res)=> {
	const data = req.body
	console.log('the req.body is', req.body)

	const user = new User({
		user:req.body.user,
		id:req.body.id
	})

	user.save().then((user)=> {
		if(user) {
			res.redirect('/dataq')
		}
	}).catch((error)=>{
		throw error
	})

});

router.get('/try',(req,res)=> {
	res.render('try')
})



router.get('/dataq',(req,res)=> {
	User.find().then((user)=> {
		if(user){
			res.render('results',{results:user})
		}
	}).catch((error)=> error)
})

router.get('/data/:id',(req,res)=> {
	const id = req.params.id;
	User.findById(req.params.id).then((user)=> {
		res.render('singleUser',{user:user})
	}).catch((error)=> {
		throw error
	})
})


module.exports = router;
