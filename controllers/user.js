'use strict';
const _ = require('lodash');
const User = require('../models/user');

module.exports = {createUser};

async function createUser(req, res, next) {
  try {
    const fields = ['firstName', 'lastName', 'email', 'age'];
    const payload = _.pick(req.body, fields);

    const user = new User(payload);
    const newUser = await user.save();
    return res.status(200).json(newUser);
    console.log(newUser);
  } catch (error) {
    console.log(error);
    next(error);
  }
}
