var express= require("express"),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    methodOverride = require('method-override'),
    Campground = require('./models/campground'),
    seedDB = require('./seeds'),
    Comment = require('./models/comment'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    passportLocalMongoose = require('passport-local-mongoose'),
    User = require('./models/user'),
    flash = require('connect-flash');

// requring routes
var commentRoutes = require('./routes/comments'),
    campgroundRoutes = require("./routes/campgrounds"),
    authRoutes = require('./routes/index');

// seedDB();
// mongoose.connect('mongodb://localhost/yelp_camp');
mongoose.connect('mongodb://maosen:086957@ds059471.mlab.com:59471/yelpcamp_db');
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(flash());
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// Passport Configuration
app.use(require("express-session")({
    secret: 'KG is my idol',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});



app.get('/', function(req,res) {
   res.render('landing');
});

app.use(authRoutes);
app.use('/campgrounds',campgroundRoutes);
app.use('/campgrounds/:id/comments',commentRoutes);



app.listen(process.env.PORT, process.env.IP, function() {
   console.log('The YelpCamp Server Has Started!'); 
});