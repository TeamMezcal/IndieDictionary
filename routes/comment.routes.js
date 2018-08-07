const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/comments.controller');

const authMiddleware = require('../middlewares/auth.middleware')

router.post(
  '/create',
  authMiddleware.isAuthenticated,
  commentsController.doCreate
);

router.get('/:id', commentsController.get); 

module.exports = router;