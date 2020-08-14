const mongoose = require('mongoose');
const User = require('./User');

const profileSchema = new mongoose.Schema({
    username : {
        type: String,
    },
    status : {
        blogNo:{
            type: Number,
            default: 0
        },
        lastBlogTime :{
            type : Date,
        }
    }
})


module.exports = mongoose.model('Profile', profileSchema);