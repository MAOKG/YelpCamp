var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');
var middleware = require('../middleware');



// Index - show all campgrounds
router.get('/', function(req, res) {
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds) {
       if (err) {
           console.log(err);
       } else {
           res.render('campgrounds/index', {campgrounds: allCampgrounds});
       }
    });
});

router.post('/', middleware.isLoggedIn, function(req, res) {
    // get data from form and add to campground array
    var name = req.body.name;
    var image = req.body.image;
    var price = req.body.price;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name: name, price: price,image: image, description: description, author: author};
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, campground) {
        if (err) {
            req.flash('error', 'Fail to create new campground');
            res.redirect('/campgrounds');
        } else {
            // redirect back to campgrounds page
            req.flash('success', 'Successfully added new campground!');
            res.redirect('/campgrounds');
        }
    });
});


router.get('/new', middleware.isLoggedIn, function(req, res) {
    res.render('campgrounds/new');
});

// SHOW - shows more info about one campground
router.get('/:id', function(req, res) {
    // find the campground with provided ID
    Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground) {
        if (err) {
            req.flash('error', 'Fail to find campground');
            res.redirect('/campgrounds')
        } else {
            // render show template with that campground
            res.render('campgrounds/show', {campground: foundCampground});
        }
    });
});

// Edit Campground route
router.get('/:id/edit', middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        
        res.render('campgrounds/edit', {campground: foundCampground});
    });
});
// Update Campground route
router.put('/:id', middleware.checkCampgroundOwnership,function(req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
       if (err) {
           console.log(err);
           res.redirect('/campgrounds');
       } else {
           res.redirect('/campgrounds/' + req.params.id);
       }
    });
});

// Destroy Campground route
router.delete('/:id', middleware.checkCampgroundOwnership,function(req, res) {
   Campground.findByIdAndRemove(req.params.id, function(err) {
       if (err) {
           res.redirect('/campgrounds');
       } else {
           res.redirect('/campgrounds');
       }
   }) 
});


module.exports = router;