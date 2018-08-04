const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


//Get dictionary page:

router.get('/dictionary', (req, res, next) => {
  console.log('im here')
  res.render ('dictionary/dictionary');
}); 

// router.get("/", function(req, res){
//   if (req.query.search) {
//      Value.find({"Word": req.query.search}, function(err, foundjobs){
//      if(err){
//          console.log(err);
//      } else {
//        console.log('word found!')
//         res.render("/dictionary/dictionary",{Word:foundjobs});
//      }
//   }); 
//   }

// Value.find({}, function(err, allJobs){
//      if(err){
//          console.log(err);
//      } else {
//         res.render("/dictionary",{jobs:allJobs});
//      }
//   });
// });


module.exports = router;
