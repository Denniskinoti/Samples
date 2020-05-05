const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');

const expressLayouts = require('express-ejs-layouts')

const expressSanitizer = require('express-sanitizer');


const path = require('path')
const public = path.join(__dirname,'public')


const app = express();
mongoose.connect('mongodb://localhost:27017/property', {useNewUrlParser: true});




app.use(expressLayouts)
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.set("view engine", "ejs");



 
//app.use(session({ secret: 'ilovescotchscotchyscotchscotch' }));


app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
 







// app.get('/new',(req,res)=> {
// 	res.render('landing');
// })
app.get('/',(req,res)=> {
	res.render('landing');
})



app.get('/login',(req,res)=>{
	res.render('login')
})

app.get('/signup',(req,res)=>{
	res.render('dashboard')
})



app.listen(8080,(err)=> {
	if(err) {
		throw err
	}
	console.log('successful server')
})
