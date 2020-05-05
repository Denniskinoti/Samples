const mongoose = require('mongoose');

const bookgenreSchema = new mongoose.Schema({
	// name : {type:String,required:true,min:3,max:100,enum['fiction','romance','military','action']}
	// name : {type:String,required:true,enum['fiction','romance','military','action'],default:'none'}
	name:{type:String,required:true}



})

//url virtuals for our genre
bookgenreSchema
.virtual('url')
.get(()=> {
	return '/catalog/bookgenreSchema' + this._id
})

module.exports = mongoose.model('bookgenre',bookgenreSchema);