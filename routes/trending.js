const express = require('express');

const Comment = require('../models/comment');

const router = express.Router();

router.get('/latest1', async (req, res) => {
   let commentContent = await Comment.firstLatestComments.find({});
   res.render('latest1', { comments: commentContent });
});
router.get('/latest2', async (req, res) => {
   let commentContent = await Comment.secondLatestComments.find({});
   res.render('latest2', { comments: commentContent });
});
router.get('/latest3', async (req, res) => {
   let commentContent = await Comment.thirdLatestComments.find({});
   res.render('latest3', { comments: commentContent });
});
router.get('/latest4', async (req, res) => {
   let commentContent = await Comment.fourthLatestComments.find({});
   res.render('latest4', { comments: commentContent });
});

// Posts
router.post('/latest1', async (req, res)=>{
   let newComment = req.body.latest1comment;
     const commentEntry = new Comment.firstLatestComments({ comment: newComment });
     await commentEntry.save();
    //  console.log('added new comment from 1');
   res.redirect('/trending/latest1');
  });
router.post('/latest2', async (req, res)=>{
   let newComment = req.body.latest2comment;
     const commentEntry = new Comment.secondLatestComments({ comment: newComment });
     await commentEntry.save();
    //  console.log('added new comment from 2');
   res.redirect('/trending/latest2');
  });
router.post('/latest3', async (req, res)=>{
   let newComment = req.body.latest3comment;
     const commentEntry = new Comment.thirdLatestComments({ comment: newComment });
     await commentEntry.save();
    //  console.log('added new comment from 3');
   res.redirect('/trending/latest3');
  });
router.post('/latest4', async (req, res)=>{
   let newComment = req.body.latest4comment;
     const commentEntry = new Comment.fourthLatestComments({ comment: newComment });
     await commentEntry.save();
    //  console.log('added new comment from 4');
   res.redirect('/trending/latest4');
  });

module.exports = router;
