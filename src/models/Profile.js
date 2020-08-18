const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    username : {
        type: String,
    },
    userId: {
        type: String,
    },
    status : {
        blogNo:{
            type: Number,
            default: 0
        },
        lastBlogTime :{
            type : Date,
        },
        follower : {
            type : String,
        },
        following : {
            type : String,
        }
    }
})


module.exports = mongoose.model('Profile', profileSchema);