const mongoose = require('mongoose');


mongoose.connect("monmongodb+srv://admin:@$$mon254@admin-dzypr.mongodb.net/test?retryWrites=true&w=majority")
	.then(()=> {
		console.log("successfully connected")
	})
	.catch((error)=>{
		console.log("connection unsuccessful")
	})

const articles = new mongoose.Schema({
	title: {type: String, required: true},
  description: {type: String, required: true},
  imageUrl: {type: String, required: true},
  userId: {type: String, required: true},
  
});

module.exports = mongoose.model('articles',articles);