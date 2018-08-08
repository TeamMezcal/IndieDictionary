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
router.get("/:id/likes", authMiddleware.isAuthenticated, wordsController.doLike);

router.post('/:id/delete', authMiddleware.isAuthenticated, wordsController.delete);
//router.get("/not-found-create", wordsController)
//router.get('/5b65b7295d541324bd6b36d9', wordsController.random); 

router.get('/:id/update', authMiddleware.isAuthenticated, wordsController.update)
//router.post('/:id/edit', authMiddleware.isAuthenticated, wordsController.doUpdate)

module.exports = router; 