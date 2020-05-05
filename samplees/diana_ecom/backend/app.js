const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');//makes sure or throws error during login if name or email or password is empty

mongoose.connect('mongodb://localhost:27017/diana_ecom', {useNewUrlParser: true});

app.use(express.static(__dirname + "/public"));
 app.use(express.static(__dirname + '/public/js'));

//user routes
const authRoutes = require('./routes/user');
const userById = require('./routes/userbyId');
const cateRoutes = require('./routes/category');
const productRoute = require('./routes/products')


const app = express();
require('dotenv').config(); 



//other middlewares
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(expressValidator());



//routes middlewares
app.use('/auth',authRoutes);
app.use('/user',userById);
app.use('/category',cateRoutes);
app.use('/products',productRoute)

const port = process.env.PORT || 3000

app.listen(port,(err)=> {
	if(err) {
		throw err
	}
	console.log(port);
})