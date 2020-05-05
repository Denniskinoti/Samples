const article = require('../models/articles')

const allArticles = (req,res,next) {
	article.find.then(
		(article)=> {
			res.status(200).json(article)
		})
	.catch((error)=> {
		throw error
		console.log('error in finding all the articles')
	})
}

const createArticle = (req,res,next) {
	req.body.thing = JSON.parse(req.body.thing);
}

module.exports = {allArticles,createArticle}