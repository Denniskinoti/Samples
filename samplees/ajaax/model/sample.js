const mongoose = require('mongoose');

const sampleSchema = new mongoose.Schema({
	user : {type:String,trim:true},
	id  : {type:String}
});

module.exports = mongoose.model('sample',sampleSchema)