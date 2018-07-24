const User = require('../models/user.models'); 
const LocalStrategy = require('passport-local').Strategy;

module.exports.setup = (passport) => {

  passport.serializeUser((user, next) => {
    next(null, user._id); 

  }); 

  passport.deserializeUser((id, next) => {
    User.findById(id)
    .then(user => {
      next(null, user); 
    })
    .catch(error => next(error)); 
  })

  passport.use('local-auth', new LocalStrategy({
    usernameField: 'email', 
    passwordField: 'password'
  }, (email, password, next) => {
    User.findOne ({ email: email })
      .then(user => {
        if (user) {
          return user.checkPassword(password)
          .then(match => {
            if (match) {
              next(null, user); 
            } else {
              next(null, null, { password: 'Fucking invalid email or password'})
            }
          }); 
        } else {
          next (null, null, { password: 'Fucking invalid email or password'})
        }
      })
      .catch(error => next(error)); 
  })); 


}

