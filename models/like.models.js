
const mongoose = require('mongoose');

module.exports = mongoose.model('Like', new mongoose.Schema({
  word: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Word',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true }));