const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	title:{type:String,trim:true},
	photo: {type:String},
	
})

module.exports = mongoose.model('user',userSchema);