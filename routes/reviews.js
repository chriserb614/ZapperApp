var express = require('express');
var router = express.Router();

var User = require('../models/userModel');
var Work = require('../models/workModel');
var Critique = require('../models/critiqueModel');

router.get('/', function(req, res) {
    res.send("reviews page");
});
var aveRate
var numOfRate
    // show review page for a particulary work
router.get('/:id', isLoggedIn, function(req, res) {

    Work.findById(req.params.id, function(err, foundWork) {
        if (err) {
            console.log(err);
        } else {
            aveCal(foundWork.ratingNum)
            res.render('critique', { currentUser: req.user, work: foundWork });
        }
    });
});

// post route for getting the review
router.post('/:id', isLoggedIn, function(req, res) {

    //create a new critique
    var critique = new Critique
    critique.reviewer = req.user._id
    critique.reviewerName = req.user.username
    critique.critiqueText = req.body.critiqueText
    critique.date = Date.now()
    critique.rating = req.body.starRating
    critique.save()
    console.log("new critique is ")
    console.log(critique)
    Work.findByIdAndUpdate(req.params.id, {
        $push: {
            critiques: critique,
            ratingNum: req.body.starRating
        },
        $set: {
            ratingSum: Math.round(aveRate * numOfRate / (numOfRate + 1) + req.body.starRating / (numOfRate + 1))
        }
    }, { new: true }).populate('works').populate('critiques').exec(function(err, foundWork) {
        if (err) {
            console.log(err);
        } else {
            res.render('work', {
                user: foundWork,
                title: foundWork.title,
                currentUser: req.user,
                work: foundWork,
                critiques: foundWork.critiques
            });
        }
    });

});



function aveCal(Arr) {
    if (Arr.length > 0) {

        var sum = 0
        for (var i = 0; i < Arr.length; i++) {
            sum += Arr[i]
        }
        return (aveRate = sum / Arr.length, numOfRate = Arr.length)
    } else {
        return aveRate = 0, numOfRate = 0
    }
}

// log in function
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

module.exports = router;