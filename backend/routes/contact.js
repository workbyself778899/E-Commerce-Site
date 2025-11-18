const router = require('express').Router();
const Contact = require('../models/contact')

router.post('/send',async(req,res)=>{
   try {
     const {name, email, subject, message} = req.body;
    const add = new Contact({
        name, 
        email,
        subject,
        message
    })
    await add.save()
    res.send({message:"Successfully, Your Contact request is submitted", add})
   } catch (error) {
     res.status(500).json({message:"Error in contact routes file", error: error.message})
   }
})

router.get('/get',async(req,res)=>{
    try {
        const getData = await Contact.find();
         res.send({message:"Successfully,contact has been  found",getData})
    } catch (error) {
         res.status(500).json({message:"Error in contact file", error: error.message})
    }

})

module.exports=router