const constants = require('../constants');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
const FIRST_ADMIN_EMAIL = process.env.FIRST_ADMIN_EMAIL;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: 'Email is fucking required',
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a fucking valid email address'],
    unique: true
  },

  password: {
    type: String,
    required: 'Password is required',
  },

  social: {
    googleId: String,
    facebookId: String
  },

  role: {
    type: String,
    enum: [constants.ROLE_ADMIN, constants.ROLE_GUEST],
    default: constants.ROLE_GUEST
  },

  activated: {
    type: String,
    enum: [constants.EMAIL_ACTIVATED, constants.EMAIL_PENDING],
    default: constants.EMAIL_PENDING
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],

  likes: [{type: mongoose.Schema.Types.ObjectId,
     ref:"Like"}]

}, {
  timestamps: true
});

userSchema.pre('save', function (next) {
  if (this.email === FIRST_ADMIN_EMAIL) {
    this.role = constants.ROLE_ADMIN;
  }

  if (this.isModified('password')) {
    bcrypt.genSalt(SALT_WORK_FACTOR)
      .then(salt => {
        return bcrypt.hash(this.password, salt)
      })
      .then(hash => {
        this.password = hash;
        next();
      })
      .catch(error => next(error));
  } else {
    next();
  }
});

userSchema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password);
}

const User = mongoose.model('User', userSchema);
module.exports = User;