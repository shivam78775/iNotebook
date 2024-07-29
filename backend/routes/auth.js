const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "ShivamRathore"


//Route:1 Create user using Post'/api/auth/createuser' No login required
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid e-mail').isEmail(),
    body('password', 'Enter a strong Password').isLength({ min: 5 })

], async (req, res) => {
    let success = false;

    //If there are errors, return Bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    //Check wheather the user with this already exists
    try {


        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({success, errors: "Email Already Exist" });
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt)
    //Create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        });
        const data = {
            user:{
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({ success:true ,authToken})
        //res.json(user)
    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Some error ocoured");
    }

})

//Route:2 Authenticate a user using Post'/api/auth/login' No login required

router.post('/login', [
    body('email', 'Enter a valid e-mail').isEmail(),
    body('password', 'Password cannot be blank').exists(),

], async (req, res) => {
    let success = false;

    //If there are errors, return Bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;
    try {
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({error:"Please try to login with correct credentials"})
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
    
            return res.status(400).json({success, error:"Please try to login with correct credentials"})
        }
        const data = {
            user:{
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({success: true, authToken})
    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Internal Server Occured");
    }

})

//Route:3 Get loggedin user details using Post'/api/auth/getuser' login required
    router.post('/getuser', fetchuser, async (req, res) => {

    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user);
    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Internal Server Occured");
    }
})


module.exports = router;
