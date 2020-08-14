const mongoose = require('mongoose');
const User = require('./User');

const followSchema = new mongoose.Schema({
    follower : {
        type : User,
    },
    followee : {
        type : User,
    }
})

module.exports = mongoose.model('Follow', followSchema);