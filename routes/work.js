var express = require('express');
var router = express.Router();

var Work = require('../models/workModel');
var Critique = require('../models/critiqueModel');
// handle base route 
router.get('/', isLoggedIn, function(req, res, next) {
    res.send('Temporarily down');
});

// show page for a specific work
router.get('/:id', isLoggedIn, function(req, res, next) {
    // find work by id
    Work.findById(req.params.id, function(err, foundWork) {
        if (err) {
            console.log(err);
        } else {
            // if no errors, render the correct page
            console.log(foundWork.critiques)
            res.render('work', { 
                currentUser: req.user, 
                work: foundWork, 
                critiques: foundWork.critiques 
            });
        }
    });
});


// destroy a specific work
router.delete('/:id', isLoggedIn, checkAuthorOwnership, function(req, res, next) {
    // find the correct work by id
    Work.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.redirect('/users/feed');
        } else {
            res.redirect('/users/feed');
        }
    });
});


// log in function
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

// check user profile the author of the work to allow for edit, update, and deletion of works
function checkAuthorOwnership(req, res, next) {
    if (req.isAuthenticated()) {
        Work.findById(req.params.id, function(err, foundWork) {
            if (err) {
                res.redirect('back');
            } else {

                // is the current user the author of the work they're trying to access?
                if (foundWork.author.id.equals(req.user._id)) {
                    next();
                } else {
                    // if not, tell them
                    res.send("You do not have permission to do that");
                }
            }
        });
    } else {
        res.redirect("back");
    }
}

module.exports = router;