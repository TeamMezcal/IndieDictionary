const createError = require('http-errors');
const mongoose = require('mongoose');
const User = require('../models/word.models');

module.exports.list = (req, res, next) => {
  Word.find()
    .then(words => {
      res.render('words/list', {
        word: words
      });
    })
    .catch(error => next(error));
}

module.exports.create = (req, res, next) => {
  res.render('words/create');
}

module.exports.doCreate = (req, res, next) => {
        word = new Word(req.body);
        console.log(req.body)
        
        word.save()
          .then((word) => {
            res.redirect('/sessions/create');
          })      
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.render('words/create', {
          word: req.body,
          errors: error.errors
        });
      } else {
        next(error);
      }
    });
};