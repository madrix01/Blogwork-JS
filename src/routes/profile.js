const router = require('express').Router();
const verify = require('../verifyToken');
const User = require('../models/User');
const Post = require('../models/Post');
const Profile = require('../models/Profile');

const userProfile = (data) => {

    const up = {
        "username" : data.username,
        "date_joined" : data.date,
    }
    return up;
}

router.get('/:username', verify, async(req, res) => {
    const profile = await Profile.findOne({username : req.params.username});
    if(!profile) return res.status(404).json({"error" : "User not found"});
    res.send(profile);
})

module.exports = router;