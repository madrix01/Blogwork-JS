const router = require('express').Router();
const verify = require('../verifyToken');
const {postValidation} = require('../validation');
const Post = require('../models/Post');
const Profile = require('../models/Profile');



//Add new post
router.post('/new', verify, async(req, res) => {
    //Post validation
    const {error} = postValidation(req.body);
    if(error) return res.status(400).json({"error" : error.details[0].message});

    //Check for duplicate title
    const titleExsist = await Post.findOne({title : req.body.title});
    if(titleExsist) return res.status(400).json({"error" : "same title exsist"})
    //Getting blog count
    //Adding new post
    const post = new Post({
        title : req.body.title,
        description : req.body.description,
        tags : req.body.tags,
        username : req.user.username
    }) 
    try{
        //saving post
        const savedPost = await post.save();

        // updating profile info
        const blogNo = await Post.find({username : req.user.username});
        const profile = await Profile.findOne({username : req.user.username});
        profile.status.blogNo = blogNo.length;
        var d = new Date();
        profile.status.lastBlogTime = d;
        await profile.save();

        //saving post 
        res.send(savedPost);
    }catch(err){
        res.status(400).send(err);
    }
})

//All blogs
router.get('/all', verify, async(req, res) =>{
    
    const blogs = await Post.find();
    res.json(blogs);
})

module.exports = router;
