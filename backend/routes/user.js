const express = require('express');
const User = require('../models/user');
const { requestPasswordReset } = require('../controllers/requestPasswordReset');
const { resetPassword } = require('../controllers/resetPassword');
const router = express.Router();
const bcrypt= require('bcrypt');

// Register user
router.post('/register',async(req,res)=>{
    const {email, username, password} = req.body;
    // if email exist 
    if(email){
        const getEmail = User.findOne({email})
        if(getEmail) res.send({message:"Email Already exist"})
    }
   try {
     const newUser = new User({
        username,
        email,
        password :"nopassword"
    })
    await newUser.save();
    res.send(newUser)
   } catch (error) {
    console.log(error)
   }
})

// login 
router.post('/login', async(req,res)=>{
    const {email, password} =req.body;
    const findEmail = await User.findOne({email});
    if(!findEmail) res.send("Email dosen't exist")
try {
    
    const checkPassword = await bcrypt.compare(password, findEmail.password)
    if(!checkPassword) res.send("Invalid data for login")

        res.send("login success")   
} catch (error) {
    console.log(error)
}
})

router.post("/pr",requestPasswordReset);
router.post("/reset/:id/:token",resetPassword);

module.exports = router;    