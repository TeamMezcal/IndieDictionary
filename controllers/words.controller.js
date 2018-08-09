const createError = require('http-errors');
const mongoose = require('mongoose');
const Word = require('../models/word.models');
const Like = require('../models/like.models')
const User = require('../models/user.models')


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
    value: req.body.value,
    example: req.body.example,
    creator: req.user._id
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
      res.render('list', {
        words
      });
    })
    .catch(error => next(error));
};

module.exports.listByUser = (req, res, next) => {
  const userId = req.user._id;
  console.info(userId)

  Word.find({
      "creator": userId
    })
    .then(words => {
      res.render('words/userWords', {
        words
      });
    })
    .catch(error => next(error));
};

module.exports.likesByUser = (req, res, next) => {
  const userId = req.user._id;
  Likes.find({
    "user": userId
  })
  .then(likes => {
    res.render('words/userWords', {
      words
    }); 
  })
  .catch(error => next(error));
}; 

module.exports.listByQuery = (req, res, next) => {
  const {
    word
  } = req.body;
  Word.findOne({
      "value": word, 
    })
    .then(word => {
      if(word) {
        res.render("words/detail", {
          word

        });
      } else {
        res.render("words/not-found-create")
      }
    })
    .catch(error => next(error));
}


module.exports.get = (req, res, next) => {

  const id = req.params.id;
  // TODO : foooking promise all 
  Word.findById(id)
    .populate('comments')
    .then(word => {
      console.info('Comentarios --> ', word)
      if (word) {
        res.render('words/detail', {
          word
        });
      } else {
        next(createError(404, 'Word with id ${id} not foocking found'))
      }
    })
    .catch(error => {
      if (error instanceof mongoose.Error.CastError) {
        next(createError(404, 'Word with id ${id} not foocking found'));
      } else {
        next(error);
      }
    });
};

module.exports.random = (req, res, next) => {

  Word.aggregate([{
      $sample: {
        size: 1
      }
    }])
    .then(words => {
      console.log(words)

      if (words) {
        res.redirect(`words/${words[0]._id}`);
      } else {
        next(createError(404, 'Word with id ${id} is not fooking found'))
      }
    })
    .catch(error => {
      if (error instanceof mongoose.Error.CastError) {
        next(createError(404, 'Word with id ${id} is not fooking found'))
      } else {
        next(error);
      }
    });
}

module.exports.doLike = (req, res, next) => {
  console.log('ENTRO')
  const id = req.params.id;
  const liker = req.user._id
  Word.findById(id)
    .then(word => {
      if (word) {
        let like = new Like({
          word: word._id,
          user: liker
        });

        like.save()
          .then(() => {
            word.likes.push(like);
            User.findById(liker)
              .then(user => {
                if (user) {
                  console.log(user)
                  user.likes.push(like);
                  user.save();
                  
                }
              })
              
              return word.save()
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


module.exports.update = (req, res, next) => {
  const id = req.params.id;
  Word.findById(id)
  .populate('words')
  .then(word => {
    if (word) {
        res.render('words/update', {
          word
        });
      } else {
        next(createError(404, `Celebrity with id ${id} not found`));
      }
    })
    .catch(error => next(error));
}; 

module.exports.doUpdate = (req, res, next) => {
  const id = req.params.id;
  console.log(req.body)
  Word.findById(id)
    .then(word => {
      
      if (word) {

        Object.assign(word, req.body);

        word.save()
          .then(() => {
            res.redirect(`/words/${id}`);
          })
          .catch(error => {
            if (error instanceof mongoose.Error.ValidationError) {
              res.render('words/create', { 
                word: word,
                //errors: error.errors
              });
            } else {
              next(error);
            }
          })
      } else {
        next(createError(404, `Word with id ${id} not found`));
      }
    })
    .catch(error => next(error));
};




module.exports.delete = (req, res, next) => {

  console.log('AQUI ESTOY')
  const id = req.params.id;
  
  Word.findByIdAndDelete(id)
    .then(() => {
      res.redirect('/mywords');
    })
    .catch(error => next(error));
}