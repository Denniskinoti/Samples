
const express = require('express');
const route = express.Router();
const control = require('../controller/gif')





route.post('/gifs',control.imgg)
//route.delete('/:id',control.gifRemove)
route.delete('/:id',control.gifRemove)
route.put('/edit/gifs:id',control.gifEdit)


module.exports = route;

