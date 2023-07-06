const mongoose = require('mongoose');

const lambaSchema = new mongoose.Schema({
   lamba: String,
});

module.exports = new mongoose.model('Lamba', lambaSchema);
