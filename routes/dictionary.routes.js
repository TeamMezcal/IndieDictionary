const express = require('express');
const router = express.Router();

//Get dictionary page:

router.get('/dictionary', (req, res, next) => {
  console.log('im here')
  res.render ('dictionary/dictionary');
}); 

module.exports = router;
