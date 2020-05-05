const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');
const route = require('./routes/user');
const app = express();
const auth = require('./routes/auth');

const passport = require('passport');
const  local = require('passport-local').Strategy;
const cloudinary = require('cloudinary').v2;
const gif = require('./routes/gif');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/v1/gif',gif);
app.use('/v1',route)
app.use('/v1/auth',auth)



module.exports = app;