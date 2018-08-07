const createError = require('http-errors');
const mongoose = require('mongoose');

const Word = require('../models/word.models');
const Comment = require('../models/comment.model');

module.exports.doCreate = (req, res, next) => {
  const id = req.body.word;

  console.log(id);

  Word.findById(id)
    .then(word => {
      if (word) {
        let comment = new Comment({
          title: req.body.title,
          text: req.body.text,
          word: word._id
        });

        comment.save()
          .then(() => {
            word.comments.push(comment);

            return word.save();
          })
          .then(() => {
            res.redirect(`/words/${id}`)
          })
          .catch(error => {
            if (error instanceof mongoose.Error.ValidationError) {
              res.render('words/detail', { 
                word: word,
                comment: comment,
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
}