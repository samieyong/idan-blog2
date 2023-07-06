const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

const User = require('../models/user');
const Lamba = require('../models/lamba');

const router = express.Router();

passport.use(User.createStrategy());
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

passport.serializeUser((user, done) => {
   {
      done(null, user.id);
   }
});

passport.deserializeUser(async (id, done) => {
   const user = await User.findById(id);
   if (user) {
      {
         done(null, user);
      }
   }
});

//google strategy
passport.use(
   new GoogleStrategy(
      {
         clientID: process.env.GOOGLE_CLIENT_ID,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
         callbackURL: 'http://localhost:3000/ouath/google/secret',
      },
      function (accessToken, refreshToken, profile, cb) {
         User.findOrCreate({ googleId: profile.id }, function (err, user) {
            return cb(err, user);
         });
      }
   )
);

//facebook strategy
passport.use(
   new FacebookStrategy(
      {
         clientID: process.env.FACEBOOK_APP_ID,
         clientSecret: process.env.FACEBOOK_APP_SECRET,
         callbackURL: 'http://localhost:3000/ouath/facebook/secret',
      },
      function (accessToken, refreshToken, profile, cb) {
         User.findOrCreate({ facebookId: profile.id }, function (err, user) {
            return cb(err, user);
         });
      }
   )
);

router.get('/', (req, res) => {
   res.render('login');
});
router.get('/register', (req, res) => {
   res.render('register');
});

//google oauth
router.get(
   '/auth/google',
   passport.authenticate('google', { scope: ['profile'] })
);

router.get(
   '/ouath/google/secret',
   passport.authenticate('google', { failureRedirect: '/' }),
   function (req, res) {
      // Successful authentication, redirect home.
      res.redirect('/home');
   }
);

//facebook auth
router.get('/auth/facebook', passport.authenticate('facebook'));

router.get(
   '/ouath/facebook/secret',
   passport.authenticate('facebook', { failureRedirect: '/' }),
   function (req, res) {
      // Successful authentication, redirect home.
      res.redirect('/home');
   }
);

router.get('/home', async (req, res) => {
   if (req.isAuthenticated()) {
      let lambaContent = await Lamba.find({});
      res.render('home', { lambas: lambaContent });
   } else {
      res.redirect('/');
   }
});

//Login users
router.post(
   '/login',
   passport.authenticate('local', {
      successRedirect: '/home',
      failureRedirect: '/',
   })
);

router.post('/register', function (req, res) {
   const password = req.body.password;
   const password2 = req.body.password2;
   if (password !== password2) {
      res.redirect('/');
   } else {
      User.register(
         new User({ username: req.body.username, email: req.body.email }),
         password,
         function (err, user) {
            if (err) {
               console.log(err);
               return res.redirect('/register');
            } else {
               passport.authenticate('local')(req, res, function () {
                  res.redirect('/home');
               });
            }
         }
      );
   }
});

module.exports = router;
