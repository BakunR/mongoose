const express = require('express');
const router = express.Router();

const articleRoutes = require('../controllers/article');

router.get('/article', articleRoutes.getArticle);
router.post('/', articleRoutes.createArticle);

router.put('/:articleId', articleRoutes.updateArticle);
router.delete('/:articleId', articleRoutes.deleteArticle);
module.exports = router;
