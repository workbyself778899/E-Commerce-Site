const mongoose= require("mongoose");
const orderSchema = new mongoose.Schema({
    fname:{
        type:String,
        required:[true,"first Name is required"]
    },
    lname:{
        type:String,
        required:[true,"Last Name is required"]
    },
     country:{
        type:String,
        required:[true,"Country is required"]
    },
     city:{
        type:String,
        required:[true,"City Name is required"]
    },
     province:{
        type:String,
        required:[true,"Province Name is required"]
    },
     address:{
        type:String,
        required:[true,"Address is required"]
    },
     phone:{
        type:Number,
        required:[true,"Phone number is required"]
    }, 
    email:{
        type:String,
        required:[true,"Email address is required"]
    },
     product:{
        type:Object,
        required:[true,"Atleast one product is required"]
    },
    company_name:{
        type:String
    },
    details:{
        type:String
    },
     zip_code:{
        type:String
    },


},{timestamps:true})

module.exports = mongoose.model('orders',orderSchema)