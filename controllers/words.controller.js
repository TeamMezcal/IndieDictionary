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
      res.render('words/detail', {
        words
      });
    })
    .catch(error => next(error));
};

module.exports.listByUser = (req, res, next) => {
  const userId = req.user._id;
  console.info(userId)

  Word.find({"creator": userId  })
  .then(words => {
    res.render('words/userWords', {
      words
    });
  })
  .catch(error => next(error));
};

module.exports.listByQuery = (req, res, next) => {
  const { word } = req.body;
  Word.findOne({"value": word})
    .then(word => {
      console.log('Word --> ', word)
      res.render("words/detail", {
        word
      });
    })
    .catch(error => next(error));

}


module.exports.get = (req, res, next) => {

  const id = req.params.id; 
  // TODO : foooking promise all 
  Word.findById(id)
    .populate('word')
    
    .then(word => {
      if(word) {
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

Word.aggregate([{ $sample: { size: 1 } }])  

  .then(words => {

    if(words) {
      res.render('words/detail', {
        words
      });
    } else {
      next(createError(404, 'Word with id ${id} is not fooking found'))
    }
  })
  .catch(error => {
    if(error instanceof mongoose.Error.CastError) {
      next(createError(404, 'Word with id ${id} is not fooking found'))
    } else {
      next(error);
    }
  }); 
}

