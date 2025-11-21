const router = require('express').Router();
const verifyAdmin = require('../middleware/verifyAdmin');
const verifyToken = require('../middleware/verifyToken');
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

router.get('/get',verifyToken, verifyAdmin ,async(req,res)=>{
    try {
        const getData = await Contact.find();
         res.send({message:"Successfully,contact has been  found",getData})
    } catch (error) {
         res.status(500).json({message:"Error in contact file", error: error.message})
    }

})

// DELETE Contact by ID
router.delete('/delete/:id',verifyToken, verifyAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const deletedData = await Contact.findByIdAndDelete(id);

        if (!deletedData) {
            return res.status(404).json({ message: "Contact not found" });
        }

        res.status(200).json({ message: "Contact deleted successfully" });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting contact",
            error: error.message
        });
    }
});


module.exports=router