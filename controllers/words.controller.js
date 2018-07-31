const createError = require('http-errors');
const mongoose = require('mongoose');
const Word = require('../models/word.models');


module.exports.create = (req, res, next) => {
  res.render('words/create');
}

module.exports.doCreate = (req, res, next) => {
  word = new Word({
    type: req.body.type,
    definition: req.body.definition,
    etymology: req.body.empathic,
    scope: req.body.scope,
    scopeOther: req.body.scopeOther, 
    style: req.body.style,
    value : req.body.value,
    example: req.body.example
  });
  
  word.save()
    .then((word) => {
      res.redirect('/saved');
    })      

  .catch(error => {
    console.log('Error: ', error)
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


module.exports.list = (req, res, next) => {
  Word.find()
    .then(words => {
      res.render('words/list', {
        words
      });
    })
    .catch(error => next(error));
}
