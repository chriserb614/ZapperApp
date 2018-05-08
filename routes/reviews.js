var express = require('express');
var router = express.Router();

var User = require('../models/userModel');
var Work = require('../models/workModel');
var Critique = require('../models/critiqueModel');

router.get('/', function(req, res) {
    res.send("reviews page");
});

// show review page for a particular work
router.get('/:id', isLoggedIn, function(req, res) {

    Work.findById(req.params.id, function(err, foundWork) {
        if(err) {
            console.log(err);
        } else {
            res.render('critique', {currentUser: req.user, work: foundWork});
        }
    });
});

// post route for getting the review
router.post('/:id', isLoggedIn, function(req, res) {

    Work.findById(req.params.id, function(err, foundWork) {
        if (err) {
            console.log(err);
        } else {
            // create a new critique
            var newCritique = new Critique ({
                reviewer: req.user._id,

                // work: {
                //     id: foundWork._id,
                //     title: foundWork.title
                // },
                critique : req.body.critique,
                date: Date.now(),
                rating: 0
            });
            
            console.log("new critique is ")
            console.log(newCritique)

            // save new critique to db
            Critique.create(newCritique, function(err, createdCritique) {
                if (err) {
                    console.log(err)
                } else {
                    console.log("Created critique is ");
                    console.log(createdCritique);
                    
                    // push the new critique into array of critiques of the work
                    foundWork.critiques.push(createdCritique);
                    // save to db
                    foundWork.save();

                    Work.findById(foundWork._id, function(err, foundWork) {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log("Found work is ");
                            console.log(foundWork)
                        }
                    });

                    // Work.findById(foundWork.id).populate('critique').exec(function(err, foundWork) {
                    //     if (err) {
                    //         console.log(err);
                    //     }  else {
                    //         console.log("Found work critiques are ")
                    //         console.log(foundWork.critiques)
                    //         res.render('work', 
                    //             {
                    //                 work: foundWork, 
                    //                 critiques: foundWork.critique,
                    //                 currentUser: req.user
                    //             }
                    //         );
                    //     }
                    // });
                }
            });
        }
    });

    // Work.findByIdAndUpdate(req.params.id, 
    //     {
    //         $push: 
    //             {
    //                 critiques: {
    //                     reviewerName: req.user.username,
    //                     critique: req.body.critique
    //                 }
    //             }
    //     }, { new: true}).populate('works', 'critiques').exec(function(err, foundWork) {
    //             if (err) {
    //                 console.log(err);
    //             }  else {
    //                 res.render('work', 
    //                     {
    //                         user: foundWork, 
    //                         title: foundWork.title, 
    //                         critiques: foundWork.critiques,
    //                         currentUser: req.user,
    //                         work: foundWork
    //                     }
    //                 );
    //         }
    //     });
});


// log in function
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

module.exports = router;