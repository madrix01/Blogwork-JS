const mongoose = require('mongoose');
const postSchema = mongoose.Schema({
    title: {
        type: String,
        require: true,
        min : 10,
        max : 50, 
    },
    description : {
        type : String,
        require: true,
        min: 20,
        max : 300,
    },
    tags : {
        type : String,
        require : false,
        max: 100,
    },
    date : {
        type : Date,
        default : Date.now,
    },
    username : {
        type : String
    }
})

module.exports = mongoose.model('Post', postSchema);