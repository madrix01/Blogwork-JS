const router = require('express').Router();
const verify = require('../verifyToken');
const {postValidation} = require('../validation');
const Post = require('../models/Post');
const User = require('../models/User');



//Add new post
router.post('/new', verify, async(req, res) => {
    //Post validation
    const {error} = postValidation(req.body);
    if(error) return res.status(400).json({"error" : error.details[0].message});

    //Check for duplicate title
    const titleExsist = await Post.findOne({title : req.body.title});
    if(titleExsist) return res.status(400).json({"error" : "same title exsist"})
    //Getting blog count 
   // const user = await User.findOne({_id : req.user.user_id});

    //Adding new post
    const post = new Post({
        title : req.body.title,
        description : req.body.description,
        tags : req.body.tags,
        user : req.user.user_id,
    }) 
    try{
        const savedPost = await post.save();
        res.send(savedPost);
    }catch(err){
        res.status(400).send(err);
    }
})

module.exports = router;
