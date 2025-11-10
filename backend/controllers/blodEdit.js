const imagekit = require('../config/imagekitconfig');
const Blog = require('../models/blog');

const blogEdit = async(req,res)=>{
  try {
    let imageUrl;
    if(req.file){
        const result = await imagekit.files.upload({
            file:req.file.buffer.toString('base64'),
            fileName: req.file.originalname,
        })
        imageUrl= result.url  // get url from ImageKit. 
    }

    const {title, contain, categories} = req.body;
    const {id} = req.params;
    console.log(id)

    const findId = await Blog.findOne({id});
    if(!findId) return res.send("This user id is not avaliable");

     const newBlog = await Blog.findByIdAndUpdate(id,{
        title,
        contain,
        ...(categories && {categories}),
        ...(imageUrl && {image: imageUrl})
     },{new:true})

    console.log(newBlog)
    res.send({message:"Successfully, Blog is Updated ",newBlog})

  } catch (error) {
    res.status(500).json({mesage:"Error on blogEdit file", error:error.message});
  }
}
module.exports={blogEdit}