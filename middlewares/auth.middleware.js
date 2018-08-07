const createError = require('http-errors'); 

module.exports.isAuthenticated = (req, res, next) => {
  if(req.isAuthenticated()) {
    next()
  }else{
    res.status(401)
    .redirect('/sessions/create'); 
  }
}

module.exports.checkRole = (role) => {
  return (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === role/*TO-DO: && USER IS CREATOR*/) {
      next(); 
    } else {
      next(createError(403, 'Not enough fucking privilages, go somewhere else'))
    }
  }
}




















