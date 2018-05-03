var express = require('express');
var router = express.Router();
var passport = require('passport');

var User = require('../models/userModel');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// show account creation form
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Zapper Registration' });
});

// show account login form
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Zapper Login' });
});

// ==============================
// POST ROUTES

// post request for registration of a new user
router.post('/register', function(req, res) {
  // create a new user
  var newUser = new User(
    {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      email: req.body.email,
      createdDate: Date.now()
    }
);

  // authenticate and register the new user to the db
  User.register(newUser, req.body.password, function(err, user) {
      if (err) {
          console.log(err);
          return res.render('register');
      }
      passport.authenticate("local")(req, res, function() {
          // if user is authenticated, redirect to the feed
          res.redirect('/users/feed');
      });
  });
});

// log in a user with post route
router.post('/login', passport.authenticate("local", 
    {
        successRedirect: '/users/feed',
        failureRedirect: '/login'
    }), function(req, res) { 
});

// logout route
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/login');
});

// is logged in function
function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
      return next();
  }
  res.redirect('/login');
}


module.exports = router;
