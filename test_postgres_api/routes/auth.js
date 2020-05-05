const express = require('express');
const passport = require('passport');
const  local = require('passport-local');
const Authentication = require('../controller/auth')



const requireSignIn = passport.authenticate('local',{session: false})
const router = express.Router();

router.get('/sing-up',(req,res)=>{
	console.log('wow! sign up!')
})

router.post('/sing-up',Authentication.signup)

router.get('/sign-in',(req,res)=> {
	res.send("wow! sign in");
})

router.post('/sign-in',requireSignIn,Authentication.login)


module.exports = router;