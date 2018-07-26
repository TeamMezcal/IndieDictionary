const passport = require("passport"); 
const express = require("express"); 
const router = express.Router(); 
const wordsController = require("../controllers/words.controller"); 

router.get("/create", wordsController.create); 
router.post("/create", wordsController.doCreate); 


module.exports = router; 