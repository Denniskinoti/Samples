const User = require('../model/users');
const multer = require('multer');
const _ = require('lodash');

const storage = multer.diskStorage({
	destination:function(req,file,cb) {
		cb(null,'public/images')
	},

	filename: function(req,file,cb) {
		cb(null,Date.now() + '_' + file.originalname);
	}
});

const form = (req,res) => {
	 const upload = multer({storage}).single('photo')
	
	upload(req,res,(err)=> {
		if(err) {
			throw err
		}
		console.log('file uploaded successfully',req.file)

		const cloudinary = require('cloudinary').v2
		cloudinary.config({
			cloud_name: 'moha254',
			api_key: '934657442839282',
			api_secret: 'hA-U4qbIYxTLwqJ34_OUmic6fgM'
		})

		const path = req.file.path
		console.log(path);
		const uniquefilename =new Date().toISOString()

		cloudinary.uploader.upload(
			path,
			{public_id: `blog/${uniquefilename}`, tags: `blog`},
			(err,image)=> {
				if(err) {
					res.send(error)
					console.log('error in the cloudinary upload')
				}
				console.log('this is the image url', image)
				console.log('the image url ends here')
				const user = new User({
					title:req.body.title,
					photo:image.secure_url
				})

				user.save().then((photo)=> {
					if(photo) {
						res.redirect('/users/home')
					}
				}).catch((error)=> {
					throw error
				})
			}


			)
	})
}


// const form = (req,res)=> {
// 	const user = new User({
// 		title: req.body.title,
// 		photo:req.body.photo,
// 	})
// 	user.save().then((photo)=> {
// 		if(photo) {
// 			res.render('show',{photo:photo});
// 		}
// 	}).catch((error)=> {
// 		throw error
// 	})
// }


const form2 = (req,res) => {
	User.find().then((photo)=> {
		
		if(photo) {
			console.log('this is the photo route',photo)
			
			console.log(photo.lengths)

			
			 res.render('show',{photo})
		}
	}).catch((error)=> {
		console.log('error at the get route');
		throw error
	})
}

const singup = (req,res) => {
	res.render('auth');
}

module.exports ={form,form2,singup}

