const mongoose = require('mongoose');
const blogSchema = new mongoose.Schema({

    time:{
        type:Date,
        required:[true,"Time is necessary for the blog"]
    },
    image:{
        type:String,
    },
    contain:{
        type:String,
        required:[true,"Contain of blog is necessary"]
    }

})
module.exports=mongoose.model("blogs",blogSchema)