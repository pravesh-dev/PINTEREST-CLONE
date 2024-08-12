const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    postText: {
        type: String,
        require: true
    },
    image: {
        type: String
    },
    description: {
        type: String
    },
    link: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    likes: {
        type: Array,
        default: [],
    }
});

module.exports = mongoose.model('Post', postSchema);
