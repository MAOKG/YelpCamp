var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require("../models/user");
// ===============
// Auth Routes
// ================

// Show sign up form
router.get('/register', function(req, res) {
    res.render('register');
});
// Handle sign up logic
router.post('/register', function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user) {
        if (err) {
            console.log(err);
            req.flash('error', err.message);
            return res.redirect('/register');
        }
        passport.authenticate('local')(req, res, function() {
            req.flash('success', 'Welcome to YelpCamp ' + user.username);
            res.redirect('/campgrounds');
        });
    })
});

// Show login form
router.get('/login', function(req, res) {
    res.render('login');
});
// Handle  login logic
router.post('/login', passport.authenticate('local', {
    successRedirect: '/campgrounds',
    failureRedirect: '/login',
    failureFlash: true
}), function(req, res) {
});


// Logout route
router.get('/logout', function(req, res) {
    req.logout();
    req.flash('success', 'Successfully logged out!');
    res.redirect('/campgrounds');
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

module.exports = router;