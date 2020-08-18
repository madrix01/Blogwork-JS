const mongoose = require('mongoose');
const User = require('./User');

const followSchema = new mongoose.Schema({
    follower : {
        type : String,
    },
    followee : {
        type : String,
    }
})

module.exports = mongoose.model('Follow', followSchema);