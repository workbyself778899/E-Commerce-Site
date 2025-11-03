const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.post('/login',(req,res)=>{
    const {email, username, password} =req.body;
    // if email exist 
    if(email){
        const getEmail = User.findOne(email)
        if(getEmail) res.send({message:"Email Already exist"})
    }
})

module.exports = router;    