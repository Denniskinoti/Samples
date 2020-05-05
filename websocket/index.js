const express = require ('express');
const bodyParser = require('body-parser');
const socket = require('socket.io');
const mongoose = require('mongoose')
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');

app.use(bodyParser.json()); //converts req.body content to json

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});



mongoose.connect("mmongodb+srv://admin:@$$mon254@admin-dzypr.mongodb.net/test?retryWrites=true&w=majority",{useNewUrlParser:true})
	.then(()=> {
		console.log("successfully connected")
	})
	.catch((error)=>{
		console.log("connection unsuccessful")
		console.error(error);
	})

app.get('/',(req,res)=> {
	res.json({message:'hello kenya.server is working well',image:"ronald.jpg"});
});

app.get('/dog',(req,res)=> {
	res.render('show')
})


var server = app.listen(8080,(err)=> {
	if(err) {
		throw err
		console.log('there is a server error')
	}
	console.log('successfull connection')
})