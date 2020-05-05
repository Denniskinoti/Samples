const express = require('express');
const passport = require('passport'); //services file that will contain our strategies

const passportService = require('../passportserv');
const requireAuth = passport.authenticate('jwt',{session:false});

const routes = express.Router();

routes.get('/*',requireAuth,(res,req)=> res.send('this is the wrong page'))

module.exports = routes;