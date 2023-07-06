const express = require('express');

const Lamba = require('../models/lamba');

const router = express.Router();

router.get('/logout', (req, res, next) => {
   req.logout((err) => {
      if (err) {
         return next(err);
      }
      res.redirect('/');
   });
});

router.get('/contact', (req, res) => {
   res.render('contact');
});

router.get('/services', (req, res) => {
   res.render('services');
});

router.post('/lamba', async (req, res) => {
   let newLamba = req.body.lamba;
   const lambaEntry = new Lamba({ lamba: newLamba });
   await lambaEntry.save();
   // console.log('New lamba was saved');
   res.redirect('/home#lambaSec');
});

module.exports = router;
