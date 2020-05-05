const express = require('express');
const db = require('../db/config');
const multer = require('multer');




//const cloudinaryStorage = require("multer-storage-cloudinary");
const storage = multer.diskStorage({
	destination: function(req, file,cb) {
		cb(null,'uploads/')
	},
	filename: function(req,file,cb) {
		console.log(file)
		cb(null, file.originalname)
	}
})

const imgg = (req,res,next) => {
	const upload = multer({storage}).single('image')
	upload(req,res, (err)=> {
		if(err) {
			throw err
			return res.send(err)
		}
		const file = req.file
		res.json(req.file)

		//sending files to cloudinary
		const cloudinary = require('cloudinary').v2
		cloudinary.config({
		cloud_name: 'moha254',
		api_key: '934657442839282',
		api_secret: 'hA-U4qbIYxTLwqJ34_OUmic6fgM'

		})

		const path = req.file.path
		console.log(path);
		const uniquefilename = new Date().toISOString()

		cloudinary.uploader.upload(
			path,
			{public_id: `blog/${uniquefilename}`, tags: `blog`},
			(err,image)=> {
				if(err){
					return res.send(err)
					console.log('error uploading to cloudinary')
				}

				db.query('insert into gif (gif_url,publiId) values($1,$2)',[image.url,image.public_id])
				var l = image.public_id
				publiic_id = l;
				console.log(l)
			}
			)
	})
}

// const gifRemove = (req,res,next) => {
// 	const id =parseInt(req.params.id);
// 	db.query('DELETE from gif where  id=$1',[id],(err,results)=> {
// 		if(err) {
// 			throw err
// 			console.log('there was an error deleting the gif url');
// 		}
// 		res.status(200).send(results.rows);

		// const cloudinary = require('cloudinary').v2
		// cloudinary.config({
		// cloud_name: 'moha254',
		// api_key: '934657442839282',
		// api_secret: 'hA-U4qbIYxTLwqJ34_OUmic6fgM'

		// })
	
		// cloudinary.uploader.destroy(id,(err,result)=> {
		// 	if(err) {
		// 		throw err
		// 	}
		// 	console.log(result);
		// })
// 	})
// }


const gifRemove = (req,res,next)=> {	

		const id = parseInt(req.params.id);
		db.query('delete from gif  where id=$1',[id],(err,result) => {
			if(err) {
				throw err
				console.log('error getting gif by id')
			}
			//res.send('successfully deleted the image')
			res.json({message:'successfully eliminated',results: resul})		
		
		})	

}

const gifEdit = (req,res,next) => {
	// const id = parseInt(req.params.id)
	// const gif
	// db.query('update gif ')
}

	
module.exports = {imgg,gifRemove,gifEdit};

