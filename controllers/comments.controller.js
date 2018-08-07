const createError = require('http-errors');
const mongoose = require('mongoose');

const Word = require('../models/word.models');
const Comment = require('../models/comment.model');

module.exports.doCreate = (req, res, next) => {
  const id = req.body.word;


  Word.findById(id)
    .then(word => {
      if (word) {
        let comment = new Comment({
          title: req.body.title,
          text: req.body.text,
          word: word._id,
          user: req.user._id
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
};

module.exports.get = (req, res, next) => {

  const id = req.params.id; 
  console.info(req.body)
  const word= req.word._id;
  // TODO : foooking promise all 
  Comment.findById(id)
    .populate('comment')
    
    .then(comment => {
      if(comment) {
        res.render(`words/${word}`, {
          comment 
        }); 
      } else {
        next(createError(404, 'Comment with id ${id} not foocking found'))
      }
    })
    .catch(error => {
      if (error instanceof mongoose.Error.CastError) {
        next(createError(404, 'Commment with id ${id} not foocking found')); 
      } else {
        next(error); 
      }
    }); 
};

module.exports.delete = (req, res, next) => {
  const id = req.params.id;
  
  Comment.findByIdAndDelete(id)
    .then(() => {
      res.redirect('/list');
    })
    .catch(error => next(error));
}

module.exports.update = (req, res, next) => {
  const id = req.params.id;
  
  Comment.findById(id)
    .then(comment => {
      if (comment) {
        res.render('comments/update', {
          comment
        });
      } else {
        next(createError(404, `Comment with id ${id} not found`));
      }
    })
    .catch(error => next(error));
}

module.exports.doUpdate = (req, res, next) => {
  const id = req.params.id;

  Comment.findById(id)
    .then(comment => {
      if (comment) {
        Object.assign(comment, req.body);

        comment.save()
          .then(() => {
            res.redirect(`/comments/${id}`);
          })
          .catch(error => {
            if (error instanceof mongoose.Error.ValidationError) {
              res.render('comments/create', { 
                comment: comment,
                errors: error.errors
              });
            } else {
              next(error);
            }
          })
      } else {
        next(createError(404, `Comment with id ${id} not found`));
      }
    })
    .catch(error => next(error));
};
