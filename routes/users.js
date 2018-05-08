var express = require('express');
var router = express.Router();
var multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, callback) {
      callback(null, 'uploads/')
    },
    filename: function(req, file, callback) {
      callback(null, file.originalname)
    }
});

var upload = multer({storage: storage, limits: {
    fileSize: 1024 * 1024 * 5
}});


var workTypes = ["Short Story/Novelette", "Novel/Novella(chapters only)", "Poetry", "Script/Screenplay/Stageplay", "Query letter/pitch/synopsis", "Other"];
var ageRanges = ["Picture books: Ages 3–8", "Early readers: Ages 5–9", "Chapter books: Ages 6–9", "Middle-grade: Ages 8–12", "Young adult (YA): 12-18", "New adult: Ages 18-22", "Adult: Ages 22+"];
var genres = [
  "Art",
  "Biography",
  "Business",
  "Chick Lit",
  "Children",
  "Christian",
  "Classics",
  "Comedy/humor",
  "Contemporary",
  "Cookbooks",
  "Crime",
  "Essays",
  "Fantasy",
  "Fiction",
  "LGBTQ",
  "History",
  "Horror",
  "Memoir",
  "Music",
  "Mystery",
  "Nonfiction",
  "Paranormal",
  "Philosophy",
  "Poetry",
  "Psychology",
  "Religion",
  "Romance",
  "Science (educational)",
  "Science-fiction",
  "Self-help",
  "Suspense",
  "Spirituality",
  "Sports",
  "Thriller",
  "Textbook",
  "Travel"
];

var User = require('../models/userModel');
var Work = require('../models/workModel');


// ==================================
// ROUTES

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// show home 'feed' page
router.get('/feed', isLoggedIn, function(req, res) {

  User.findById(req.user._id, function(err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      User.findByIdAndUpdate(req.user._id, { $set: { lastLogin: Date.now() }}, {new: true}, function(err,user){
      });
    }
  });

  // User.findByIdAndUpdate(req.user._id, {$set: {'lastLogin': Date.now()}});

  if (req.query.search) {
      console.log(req.query)
      const regex = new RegExp(escapeRegex(req.query.search), 'gi');

      User.find({'$or': [{'firstname': regex}, {'lastname': regex}, {'username': regex}, {'email': regex}]}, function(err, foundUser) {
        if (err) {
          console.log(err)
        } else {
          if (foundUser.length < 1) {
              res.send("There are no matching users.")
          } else {
              console.log(foundUser);
              res.render('searchResults', {
                currentUser: req.user, 
                users: foundUser
              });
          }
        }
      });

  } else {
   
    // find all the works
    Work.find({}, function(err, works) {
      if (err) {
        console.log(err)
      } else {
        res.render('feed', {
          currentUser: req.user, 
          works: works,
          workTypes: workTypes,
          ageRanges: ageRanges,
          genres: genres
        });
      }
    })
  }
});

router.post('/searchFeed', isLoggedIn, function(req, res) {
    console.log(req.body.selectGenre)
    console.log(req.body.selectType);

    
    Work.find({genre: req.body.selectGenre,}, function(err, genreData){
        if(err) {
          console.log(err);
        } else {
          console.log(genreData)
        }
    })
})

//workType: req.body.selectType

// WORK ROUTES
// ===========================================================

// show work form for new work submission
router.get('/:id/work/new', isLoggedIn, function(req, res) {
  User.findById(req.params.id, function(err, foundUser) {
    if(err) {
      console.log(err)
    } else {
      res.render('newWork', 
      {
        currentUser: req.user,
        workTypes: workTypes,
        ageRanges: ageRanges,
        genres: genres,
      });
    }
  });
});

router.post('/:id/work', isLoggedIn, function(req, res) {

    // find the correct user
    User.findById(req.params.id, function(err, foundUser) {
      if (err) {
        console.log(err)
        res.redirect('/:id');
      } else {
            // create new work
            var newWork = new Work(
                {
                    title : req.body.title,
                    genre : req.body.genre,
                    workType : req.body.workType,
                    length : req.body.length,
                    ageRange : req.body.ageRange,
                    manuscriptText : req.body.manuscriptText,
                    author: {
                      id: foundUser._id,
                      username: foundUser.username
                    }
                }
            );

            // save new work to db
            Work.create(newWork, function(err, work) {
              if (err) {
                console.log(err)
              } else {
                // push work into array of works of the user
                foundUser.works.push(work);
                // save to db
                foundUser.save();
                // redirect to user's profile page
                User.findById(foundUser._id).populate('works').exec(function(err, foundUser) {
                  if (err) {
                    console.log(err);
                  }  else {
                    res.render('showProfile', 
                      {
                        user: foundUser, 
                        title: foundUser.username, 
                        works: foundUser.works,
                        currentUser: req.user
                      }
                    );
                  }
                });
                // res.render('showProfile', 
                //   {
                //     user: foundUser, 
                //     title: foundUser.username, 
                //     works: foundUser.works,
                //     currentUser: req.user
                //   }
                // );
              }
            });
        }
    });
});

// USER PROFILE ROUTES
// =============================================

// basic show profile route
router.get('/:id', isLoggedIn, function(req, res) {
  // get current user
  var currentUser = req.user;
  // get the correct user we're searching for
  User.findById(req.params.id).populate('works').exec(function(err, foundUser) {
    if (err) {
      console.log(err);
    }  else {
      res.render('showProfile', 
        {
          user: foundUser, 
          title: foundUser.username, 
          works: foundUser.works,
          currentUser: req.user
        }
      );
    }
  });
});

router.post('/:id', isLoggedIn, function(req, res) {
  var receivingId = req.body.recevingId;

  User.findById(req.params.id, function(err, foundUser) {
    if (err) {
      console.log(err);
    } else {

      // define the sending friend
      var sendingFriend = {
        sendingFriendId: req.user._id,
        sendingFriendName: req.user.username
      }
      // save the sending friend to the receiving friend's friend request array
      foundUser.friendRequests.push(sendingFriend);
      foundUser.save();
    }
  });
});


// edit profile show route
router.get('/:id/edit', isLoggedIn, checkProfileOwnership, function(req, res) {
    User.findById(req.params.id, function(err, foundUser) {
        res.render('editProfile', 
          {
            user: foundUser, 
            title: foundUser.username, 
            works: foundUser.works,
            currentUser: req.user
          }
        );
    });
});

// update profile post route
router.put('/:id', isLoggedIn, checkProfileOwnership, upload.single('profilePic'), function(req, res) {

    // get user inputted values from edit form
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var zip = req.body.zip;
    var bio = req.body.bio;
    var influences = req.body.influences;
    var favBooks = req.body.favBooks;
    var notWriting = req.body.notWriting;
    var favHero = req.body.favHero;
    var favVillain = req.body.favVillain;

    // // check image upload
    // if(req.file) {
    //   var profilePic = req.file.filename;
    // } else {
    //   console.log("no")
    //   var profilePic = 'noimage.jpg'
    // }

    // find and update the correct user
    User.findByIdAndUpdate(req.params.id, 
      {
        firstname: firstname, 
        lastname: lastname, 
        bio: bio, 
        zip: zip,
        profilePic: req.file.path,
        influences: influences,
        favBooks: favBooks,
        notWriting: notWriting,
        favHero: favHero,
        favVillain: favVillain
      }, { new: true}, function(err, updatedUser) {
      if(err) {
        console.log(err);
      } else {
        // redirect to user profile page
        res.redirect('/users/' + req.params.id);
      }
    });
});

// log in function
function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
      return next();
  }
  res.redirect('/login');
}

// check user profile ownership to allow for edit, update, and deletion of profiles
function checkProfileOwnership(req, res, next) {
    if(req.isAuthenticated()) {
      User.findById(req.params.id, function(err, foundUser) {
        if (err) {
            res.redirect('back');
        } else {

          // does the current user own the profile they're trying to access?
          if(foundUser._id.equals(req.user._id)) {
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

// escape regex string to parse query url
function escapeRegex(str) {
  return str.replace(/[-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

module.exports = router;
