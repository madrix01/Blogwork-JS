const router = require('express').Router();
const verify = require('../verifyToken');
const User = require('../models/User');
const Post = require('../models/Post');

const userProfile = (data) => {

    const up = {
        "username" : data.username,
        "date_joined" : data.date,
        "blogs" : data.status.blogNo,
    }
    return up;
}

router.get('/:username', verify, async(req, res) => {
    const user = await User.findOne({username : req.params.username});
    const blogNo = await Post.find({"user": user._id})
    if(!user) return res.status(404).json({"error" : "User not found"});
    res.send(userProfile(user))
})

module.exports = router;