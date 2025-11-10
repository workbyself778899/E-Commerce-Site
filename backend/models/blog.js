const mongoose = require('mongoose');
const blogSchema = new mongoose.Schema({

    image:{
        type:String,
    },
    contain:{
        type:String,
        required:[true,"Contain of blog is necessary"]
    },
    title:{
        type:String
    },
    categories:{
        type:"String",
        enum:['Crafts', 'Design', 'Handmade', 'Interior', 'Wood'],
        default:"Interior",
    }

},{
    timestamps:true
})
module.exports=mongoose.model("blogs",blogSchema)