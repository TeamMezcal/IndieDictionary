const constants = require('../constants');
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

    empathicEtymology: {
        type: String, 
        required: "Expressing your fucking emotions is fucking required",
    }, 

    scopeOfUse : {
        type : String,
        required: 'Where do you fucking use this word?',
        enum: [constants.SCOPE_LOCAL, constants.SCOPE_REGIONAL, constants.SCOPE_NATIONAL, constants.SCOPE_WORLDWIDE, constants.SCOPE_OTHER]
    },

    scopeOther : {
        type : String,
    }, 

    style: {
        type: String, 
        required: "Be a little fucking specific, please.",
        emum: [constants.STYLE_GENERAL, constants.STYLE_FORMAL, constants.STYLE_COLLOQUIAL, constants.STYLE_VULGAR, constants.STYLE_INSULT]
    },

    word: {
        type: String, 
    }

})

const Word = mongoose.model('Word', wordSchema);
module.exports = Word;
