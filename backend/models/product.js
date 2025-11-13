const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Product name is required"]
    },
    photo:{
        type:String,
        required:[true,"Photo is required"]
    },
    price:{
        type:Number,
        required:[true,"Price of product is required"]
    },
    type:{
        type:String,
        enum:["Table","Chair","Sofa","Hybrid"],
    },
    body:{
        type:String
    }
});

module.exports=mongoose.model('products', productSchema)