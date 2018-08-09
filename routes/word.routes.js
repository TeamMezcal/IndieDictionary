const passport = require("passport"); 
const express = require("express"); 
const router = express.Router(); 
const wordsController = require("../controllers/words.controller");
const authMiddleware = require('../middlewares/auth.middleware');
const mongoose = require('mongoose');

router.post("/", wordsController.listByQuery);
router.get("/", wordsController.random);


router.get("/create", authMiddleware.isAuthenticated, wordsController.create); 
router.post("/create", authMiddleware.isAuthenticated, wordsController.doCreate); 

router.get('/:id', wordsController.get); 
//router.get('/5b65b7295d541324bd6b36d9', wordsController.random); 

// router.get('/:id/edit', authMiddleware.isAuthenticated, wordsController.edit)
// router.post('/:id/edit', authMiddleware.isAuthenticated, wordsController.doEdit)

module.exports = router; 