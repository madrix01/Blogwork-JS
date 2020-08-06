const router = require('express').Router();
const User = require('../models/User');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {registerValidation, loginValidation} = require('../validation');


//REGISTER
router.post('/register', async (req, res) => {

    //Validating the information 
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    //Check for duplicate
    const usernameExsist = await User.findOne({username : req.body.username});
    const emailExsist = await User.findOne({email : req.body.email});
    if (emailExsist || usernameExsist) return res.status(400).send("Email or Username already exsist");

    //Hashing the password
    const salt = await bycrypt.genSalt(10);
    const hashPassword = await bycrypt.hash(req.body.password, salt);
    
    //Create a new user
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashPassword,
    })
    try{
        const savedUser = await user.save();
        res.send(savedUser);
    }catch(err){
        res.status(400).send(err);
    }
})
router.get('/register', (req, res) => {
    res.json({
        'page' : 'register',
    })
})

//LOGIN
router.get('/login', (req, res) => {
    res.json({
        'page' : 'login',
    })
})

router.post('/login',async (req, res) => {

    //Info Validation
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Check username
    const user = await User.findOne({username : req.body.username});
    if(!user) return res.status(400).json({'error' : 'Email not found'});

    //Check password is correct
    const validPassword = await bycrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).json({'error' : 'Password not found'});

    //Create and assign a token
    const token = jwt.sign({username : user.username}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).json({"auth-token" : token});
    console.log("Logged in");

})



module.exports = router;