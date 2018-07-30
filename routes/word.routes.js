const passport = require("passport"); 
const express = require("express"); 
const router = express.Router(); 
const wordsController = require("../controllers/words.controller");
const authMiddleware = require('../middlewares/auth.middleware');
const mongoose = require('mongoose');


router.get("/create", authMiddleware.isAuthenticated, wordsController.create); 
router.post("/create", wordsController.doCreate); 


module.exports = router; 