'use strict';
const _ = require('lodash');
const Article = require('../models/article');
const utilError = require('../config/errorHelper');
const {query} = require('express');
const {search} = require('../routes/article.route');
const {escapeRegExpChars, sort} = require('../config/util');

module.exports = {createArticle, updateArticle, deleteArticle, getArticle};

async function createArticle(req, res, next) {
  const fields = ['title', 'subTitle', 'description', 'owner', 'category'];
  const body = req.body;
  const newArticle = _.pick(body, fields);
  try {
    const existingArticle = await Article.findOne({title: body.title});
    if (existingArticle) {
      throw utilError.badRequest(' Article exist!!');
    }

    const article = new Article(newArticle);
    await article.save();
    return res.status(200).json(article);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function updateArticle(req, res, next) {
  const articleId = req.params.id;
  const body = req.body;

  try {
    const findArticle = await Article.findOne({articleId});
    if (!findArticle) {
      throw utilError.badRequest(' Article not exist!!');
    }
    if (body.title) {
      findArticle.title = body.title;
    }
    if (body.description) {
      findArticle.description = body.description;
    }

    await findArticle.save();
    return res.status(200).json(findArticle);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function deleteArticle(req, res, next) {
  const idToDel = req.params.articleId;

  try {
    // const result = await Article.findByIdAndDelete(idToDel);
    const result = await Article.deleteOne({id: idToDel}); // чомусь не працює()
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function getArticle(req, res, next) {
  try {
    const {
      query: {skip = 0, limit = 10, search = '', sortFromClient}
    } = req;

    const sort = util.sort(sortFromClient);
    const filter = {$regex: new RegExp(util.escapeRegExpChars(search), 'i')};
    const query = {$or: [{title: filter}, {description: filter}]};
    const result = await Article.find(query).populate('owner').sort(sort).skip(skip).limit(limit);
    console.log('res', result);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
}
