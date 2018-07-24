const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema ({

    typeOfWord: {
        type: String,
        required : "This is a fucking dictionary, of couse it's fucking required, idiot.", 
        enum: [constants.TYPE_VERB, constants.TYPE_ADVERB, constants.TYPE_ADJECTIVE, constants.TYPE_OBJECT, constants.TYPE_IDIOM, constants.TYPE_INTERJECTION, ],
  
    },

    definition: {
        type: String, 
        required: "This is a fucking dictionary, of couse it's fucking required, idiot.", 
    }, 

    empathicEthimology: {
        type: String, 
        required: "Expressing your fucking emotions is fucking required",
    }, 


})
