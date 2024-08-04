const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/pinterestClone");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }], 
  fullName: {
    type: String,
    require: true
  },
  dp: {
    type: String
  },
})

userSchema.plugin(plm);

module.exports = mongoose.model('User', userSchema);