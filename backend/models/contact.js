const mongoose = require('mongoose');
const contactSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"]
    },
    email:{
        type:String,
        required:[true,"Email is required"]
    },
    subject:{
        type:String,
       
    },
    message:{
        type:String,
        
    }
})

module.exports = mongoose.model('contacts',contactSchema)