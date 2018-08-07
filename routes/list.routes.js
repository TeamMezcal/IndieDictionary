const passport = require("passport"); 
const express = require("express"); 
const router = express.Router(); 
const wordsController = require("../controllers/words.controller");
const mongoose = require('mongoose');

//Get home page:

router.get('/', wordsController.list); 


module.exports = router;
