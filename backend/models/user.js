const mongoose = requrie('mongoose')
const userSchema = new mongoose.Schema({
    username:{
        type: String,        
    },
    email:{
        type: String,
        required: "email is required"
    },
    password:{
        type: String,
        required: "password im required in models "
    }
})
module.exports = mongoose.model('user',userSchema)