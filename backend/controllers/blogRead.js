const Blog = require('../models/blog');
const blogRead = async(req,res)=>{
  try {
      const getBlog = await Blog.find();
    res.send({message:"All blog found", getBlog})
  } catch (error) {
    res.status(500).json({mesage:"Error on blogRead file", error:error.mesage});
  }
}
module.exports={blogRead}

