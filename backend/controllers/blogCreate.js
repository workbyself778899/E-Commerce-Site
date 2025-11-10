
const imagekit = require('../config/imagekitconfig');
const Blog = require('../models/blog')
 
const addBlog = async(req,res)=>{

try {
    let imageUrl;
   
    if(req.file){
        const result = await imagekit.files.upload({
            file:req.file.buffer.toString('base64'),
            fileName: req.file.originalname,
        })
        imageUrl= result.url  // get url from ImageKit. 
    }

    const {title, contain,categories}=req.body;
    const newBlog = new Blog({
        title,
        contain,
        ...(categories && {categories}),
        ...(imageUrl && {image: imageUrl})
    })
    await newBlog.save();
    res.status(200).json({message:"Successfully, Blog is Created"},newBlog)

} catch (error) {
    res.status(500).json({message:"error occure", error:error.message})
}

}
module.exports= {addBlog}