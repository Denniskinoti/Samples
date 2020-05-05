const mongoose = require('mongoose');

const BookInstanceSchema = new mongoose.Schema({
	book:{type:mongoose.Schema.Types.ObjectId,ref:'Book',required:true},
	imprint:{type:String,required:true},
	 status:{type:String,required:true,enum:['Available','Maintenacne','Loaned','Reserved'],default:'Maintenacne'},

	due_back:{type:Date,default:Date.now}
})

//virtual for book instance
BookInstanceSchema
.virtual('url')
.get(()=> {
	return '/catalog/bookinstance/' + this._id;
})

module.exports = mongoose.model('BookInstance',BookInstanceSchema)