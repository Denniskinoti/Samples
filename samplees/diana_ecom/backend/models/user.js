const mongoose = require('mongoose');
const crypto = require('crypto');
const uuidv1 = require('uuid/v1')


const userSchema = new mongoose.Schema({
	name:{type: String, required:true, trim:true,maxLength: 32},
	email:{type:String, required:true,trim:true, unique:true},
	hashed_password:{type:String, required:true},
	about: {type:String, trim: true},
	salt: String,
	role: {type: Number, default:0},
	history: {type: Array, default:[]}
}, {timestamps:true});




module.exports = mongoose.model('Users', userSchema)