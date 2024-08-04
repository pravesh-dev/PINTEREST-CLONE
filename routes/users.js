const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');

const userSchema = mongoose.Schema({
  userName: {
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
    require: true
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