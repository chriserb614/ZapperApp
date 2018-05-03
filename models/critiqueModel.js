var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var CritiqueSchema = new mongoose.Schema({
    reviewer: String,
    // reviewer: {
    //     id: {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "User"
    //     },
    // },
    // work: {
    //     id: {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "Work"
    //     },
    //     title: String
    // },
    critique: String,
    date: {
        type: Date,
        default: Date.now
    },
    rating: {
        type: Number
    }
});


CritiqueSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("Critique", CritiqueSchema);