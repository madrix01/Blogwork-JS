const router = require('express').Router();
const User = require('../models/User');
const verify = require('../verifyToken');

router.get('/',verify ,(req, res) => {
    //res.json({posts: {title : 'POST 1', description : 'Checking json web token'}})
    res.json(req.user);
})


module.exports = router;
