const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    username:{
        type: String,     
        unique: true, 
        trim:true  
    },
    email:{
        type: String,
        required: [true,"email is required"],
        unique: true,
        trim:true,
    },
    password:{
        type: String,
        tirm:true,
        required: [true,"password im required in models "]
    },
    role:{
        type:String,
        enum:['admin','user'],
        default: "user",
        required:[true,"user role is required"],     
    },
    image:{
        type:String,
    },
    cart:[
          {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
      quantity: { type: Number, default: 1 }
    }
    ],
    favourites:[
          {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
      selected: {type:Boolean}
    }
    ]
},
{timestamps:true})
module.exports = mongoose.model('user',userSchema)