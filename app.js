require('dotenv').config(); 

const createError = require ('http-errors')
const express = require ('express')
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');

require('./configs/db.config');
require('./configs/hbs.config');
require('./configs/passport.config').setup(passport);

//Routers
const indexRouter = require('./routes/index.routes');
const usersRouter = require('./routes/user.routes'); 
const sessionsRouter = require('./routes/session.routes');
const wordsRouter = require('./routes/word.routes');
const savedRouter = require('./routes/saved.routes');
const dictionaryRouter = require('./routes/dictionary.routes'); 
const userWordsRouter = require('./routes/mywords.routes')
const listRouter = require('./routes/list.routes'); 
const commentsRouter = require('./routes/comment.routes'); 

const Picture = require("./models/picture.models"); 
const multer = require('multer');
//
// We create our own server named app
// Express server handling requests and responses
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.use(logger('dev')); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session( {
  secret: 'SuperFookingSecret, (fucking change me)', 
  resave: false, 
  saveUninitialized: true, 
  cookie: {
    secure: false, 
    httpOnly: true, 
    maxAge: 60 * 60 * 24 * 1000
  }

})); 

app.use(passport.initialize()); 
app.use(passport.session()); 

app.use((req, res, next) => {
  res.locals.session = req.user; 
  next(); 
})

app.use('/users', usersRouter);
app.use('/sessions', sessionsRouter);
app.use('/words', wordsRouter);
app.use('/', indexRouter);
app.use('/saved', savedRouter);
app.use('/dictionary', dictionaryRouter); 
app.use('/list', listRouter);
app.use('/mywords', userWordsRouter);
app.use('/comments', commentsRouter); 


//catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404)); 
}); 

//error handler
app.use(function(err, req, res, next) {
  //set locals to provide errors only during development
  res.locals.message = err.message; 
  res.locals.error = req.app.get('env') === 'development' ? err: {};  

  //render tue error page
  res.status(err.status || 500 )
  res.render('error'); 
}); 


app.listen(3000);

module.exports = app



