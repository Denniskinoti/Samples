const express = require('express');
const router = express.Router();
const controller = require('../controller/user');



router.get('/',controller.getAllUsers);
router.get('/users/:id',controller.getUserById);
router.delete('/item/:id',controller.removeItem);
router.post('/',controller.Adduser);


module.exports = router;