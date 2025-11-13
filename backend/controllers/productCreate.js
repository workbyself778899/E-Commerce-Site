
const imagekit = require("../config/imagekitconfig");
const Product= require("../models/product")


const addProduct = async(req,res)=>{
    try {
        let imageUrl;
        if(req.file){
            const result = await imagekit.files.upload({
                file:await req.file.buffer.toString('base64'),
                fileName:await req.file.originalname,
            })
            imageUrl = result.url
            console.log(imageUrl)
        }
        const {name,price,type,body} =req.body;
        const newProduct = new Product({
            name,
            price,
            type,
            body,
            ...(imageUrl && {photo: imageUrl})
        })
        await newProduct.save();
        res.status(200).json({message:"Successfully, product added", newProduct});
    } catch (error) {
        res.status(500).json({message:"Error in productCreate file", error:error.message})
    }

}
module.exports={addProduct}