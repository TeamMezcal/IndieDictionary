const passport = require("passport"); 
const express = require("express"); 
const router = express.Router(); 
const wordsController = require("../controllers/words.controller");
const authMiddleware = require('../middlewares/auth.middleware');
const mongoose = require('mongoose');

//Get mywords:

router.get("/", authMiddleware.isAuthenticated, wordsController.listByUser);


module.exports = router;


