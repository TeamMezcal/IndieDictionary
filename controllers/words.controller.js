const createError = require('http-errors');
const mongoose = require('mongoose');
const Word = require('../models/word.models');

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
        word = new Word({
          typeOfWord: req.body.type,
          definition: req.body.definition,
          empathicEtymology: req.body.empathic,
          scopeOfUse: req.body.scope,
          scopeOther: req.body.scopeOther, 
          style: req.body.style,
          word: req.body.word
        });
        //console.log(req.body.style, req.body.definition, req.body.empathic, req.body.scope)
        
        word.save()
          .then((word) => {
            res.redirect('/sessions/create');
          })      
          
          //console.log(word)

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