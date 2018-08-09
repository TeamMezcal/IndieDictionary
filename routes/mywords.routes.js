const passport = require("passport"); 
const express = require("express"); 
const router = express.Router(); 
const wordsController = require("../controllers/words.controller");
const authMiddleware = require('../middlewares/auth.middleware');


//Get mywords:

router.get("/", authMiddleware.isAuthenticated, wordsController.listByUser, wordsController.likesByUser);


module.exports = router;


