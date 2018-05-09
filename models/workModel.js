var mongoose = require('mongoose')

var WorkSchema = new mongoose.Schema({
    title: String,
    genre: String,
    workType: String,
    length: Number,
    ageRange: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String
    },
    manuscriptText: String,
    critiques: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Critique'
    }],
    ratingNum: [Number],
    ratingSum: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    },
    isPublic: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('Work', WorkSchema)