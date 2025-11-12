const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Product name is required"]
    },
    photo:{
        type:Array,
        required:[true,"Atlest is need one Photo"]
    },
    price:{
        type:Number,
        required:[true,"Price of product is required"]
    },
    type:{
        type:String,
        enum:["Table","Chair","Sofa"]
    }

});

module.exports=mongoose.model('products', productSchema)