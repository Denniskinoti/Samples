const express = require('express');
const router = express.Router();

const articles = require('../controller/articles')

router.get('/',articles.allArticles);
router.post('/',articles.createArticle)

module.exports = router;