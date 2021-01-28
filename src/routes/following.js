const router = require('express').Router();
const verify = require('../verifyToken');
const User = require('../models/User');
const Profile = require('../models/Profile');
const Follow = require('../models/Follow');


router.post('/:username/follow', verify, async(req, res) => {
    const follower = await Profile.findOne({username : req.params.username});
    if(!follower) return res.status(400).json({"error" : "Profile not found"});
    const followee = await Profile.findOne({username : req.user.username});
    const follow = new Follow({
        "follower" : follower.username,
        "followee" : req.user.username,
    })
    try{
        const saveRelation = await follow.save();
        res.json(saveRelation);
    }catch(err){
        res.status(400).send(err);
    }
})

module.exports = router;