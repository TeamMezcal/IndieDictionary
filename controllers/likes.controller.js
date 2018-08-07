const createError = require('http-errors');
const mongoose = require('mongoose');

const Word = require('../models/word.models');
const Like = require('../models/like.models')

module.exports.doLike = (req, res, next) => {
    const id = req.body.word;
    console.log(req.body)
  Word.findById(id)
    .then(word => {
      if (word) {
        let like = new Like({
          word: word._id,
          user: req.user._id
        });

        like.save()
          .then(() => {
            word.likes.push(like);
            user.likes.push(like);

           return word.save(), user.save();
          })
          .then(() => {
            res.redirect(`/words/${id}`)
          })
          .catch(error => {
            if (error instanceof mongoose.Error.ValidationError) {
              res.render('words/detail', { 
                word: word,
                like: like,
                errors: error.errors
              });
            } else {
              next(error);
            }
          })
      } else {
        next(createError(404, `Word with id ${id} not found`));
      }
  })
  .catch(error => {
    if (error instanceof mongoose.Error.CastError) {
      next(createError(404, `Word with id ${id} not found`));
    } else {
      next(error);
    }
  });
};