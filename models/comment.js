const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
   comment: String,
});

const firstLatestComments = new mongoose.model('firstLatestComment', commentSchema);
const secondLatestComments = new mongoose.model('secondLatestComment', commentSchema);
const thirdLatestComments = new mongoose.model('thirdLatestComment', commentSchema);
const fourthLatestComments = new mongoose.model('fourthLatestComment', commentSchema);
const comments = {
    firstLatestComments: firstLatestComments,
    secondLatestComments: secondLatestComments,
    thirdLatestComments: thirdLatestComments,
    fourthLatestComments: fourthLatestComments
};

module.exports = comments;