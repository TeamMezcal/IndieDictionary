const express = require('express');
const router = express.Router();

//Get dictionary page:

router.get('/dictionary', (req, res, next) => {
  res.render ('dictionary');
}); 

module.exports = router;
