const Blog = require('../models/blog');
const blogReadId = async(req,res)=>{
  try {
    const {id} =req.params;
      const getBlog = await Blog.findById(id);
    res.send({message:"Your, Blog is found", getBlog})
  } catch (error) {
    res.status(500).json({mesage:"Error on blogReadId file", error:error.mesage});
  }
}
module.exports={blogReadId}