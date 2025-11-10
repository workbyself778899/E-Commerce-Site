const Blog = require("../models/blog")


const deleteBlog =async(req,res)=>{
    try {
            const {id} = req.params;
    const data = await Blog.findByIdAndDelete(id)
    if(!data) res.send({message:"Blog is not Deleted"})
    // else 
        res.send({message:"Successfully, Blog is deleted",data});
    } catch (error) {
        res.status(500).json({message:"Error in blogDelete file", error:error.message})
    }
}
module.exports = {deleteBlog}