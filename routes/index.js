const userRoutes = require('./user.route');
const ArticleRoutes = require('./article.route');
const express = require('express');
const router = express.Router();

router.use('/user', userRoutes);
router.use('/article', ArticleRoutes);

module.exports = router;
