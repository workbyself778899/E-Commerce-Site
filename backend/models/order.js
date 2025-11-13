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
     provience:{
        type:String,
        required:[true,"Provience Name is required"]
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