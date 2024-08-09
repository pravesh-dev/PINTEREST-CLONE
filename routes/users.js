const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/pinterestClone");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  profileImage: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }], 
  fullName: {
    type: String,
    required: true,
  },
});

// Passport-local-mongoose will add a 'username' and 'hash' and 'salt' to the schema
userSchema.plugin(plm);

module.exports = mongoose.model('User', userSchema);
