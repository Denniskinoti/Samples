var express = require('express');
const Pages = require('../controller/pages');
const auth = require('../controller/auth');
var router = express.Router();

/* GET home page. */
router.get('/user/home',auth.allowIfLoggedin,Pages.home);
router.get('/',Pages.landing)
router.get('/singup',Pages.singup);
router.get('/login',Pages.login);


module.exports = router;
