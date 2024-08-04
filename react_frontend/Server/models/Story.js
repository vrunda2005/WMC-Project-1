const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
    username: String,
    story: String,
    date: { type: Date, default: Date.now }
});
  
module.exports = mongoose.model('Story', storySchema);