const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


//Get home page:

router.get('/', (req, res, next) => {
  console.log('AQUI ESTA LIST')
  res.render ('words/list');
}); 

module.exports = router;
