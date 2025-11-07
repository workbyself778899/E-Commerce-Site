const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    username:{
        type: String,     
        unique: true,   
    },
    email:{
        type: String,
        required: [true,"email is required"],
        unique: true,
    },
    password:{
        type: String,
        required: [true,"password im required in models "]
    },
    role:{
        type:String,
        enum:['admin','user'],
        default: "admin",
        required:[true,"user role is required"],
     
    }
})
module.exports = mongoose.model('user',userSchema)