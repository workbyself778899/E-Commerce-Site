const express = require('express');
const User = require('../models/user');
const { requestPasswordReset } = require('../controllers/requestPasswordReset');
const { resetPassword } = require('../controllers/resetPassword');
const router = express.Router();
const bcrypt= require('bcrypt');
const { editUser } = require('../controllers/editUser');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/verifyToken');


// Register user
router.post('/register',async(req,res)=>{
    const {email, username, password} = req.body;
   
   try {
    // if email exist 
     const getEmail = await User.findOne({email})
    if(getEmail) return res.send({message:"Email Already exist"})
        const getUser = await User.findOne({username});
    if(getUser) return res.send({message:"Username already exist"})

        // this Password doesn't work because of encryption 
     const newUser = new User({
        username,
        email,
        password :"nopassword"
    })
    await newUser.save();
    res.send({message:"User Account Created Successfully", newUser})
   } catch (error) {
    console.log(error)
   }
})

// Multer file handling 
const upload = multer({storage: multer.memoryStorage()});

// login 
router.post('/login',  async(req,res)=>{
    const {email, password} =req.body;
    const findEmail = await User.findOne({email});
    if(!findEmail) res.send("Email dosen't exist")
try {
    
    const checkPassword = await bcrypt.compare(password, findEmail.password)
    if(!checkPassword) res.send("Invalid data for login")

        // Token for user 
    const token = jwt.sign({_id:findEmail._id},process.env.TOKEN_SECREAT);
    res.header('auth-token', token).send({message:"User is logeed In", token,findEmail})
} catch (error) {
    console.log(error)
}
})

router.post("/pr",requestPasswordReset);
router.post("/reset/:id/:token",resetPassword);

router.put('/edit',verifyToken ,upload.single('image'),editUser)

// Get user details
router.get('/details/:id',async(req,res)=>{
try {
        const {id} = req.params;
    const user = await User.findById(id).select('-password');
    res.status(200).json({message:"See the user", user})
} catch (error) {
    res.send(error);
}

})

module.exports = router;    