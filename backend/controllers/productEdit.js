const imagekit = require("../config/imagekitconfig");
const Product = require("../models/product");

const productEdit = async(req,res)=>{
    try {
        let imageUrl;
        if(req.file){
            const result = await imagekit.files.upload({
                file:req.file.buffer.toString('base64'),
                fileName: req.file.originalname,
            });
            imageUrl= result.url;
        }
        const { name, price, type, body } =req.body;
        const {id} = req.params;
        console.log(id)
        const findId = await Product.findById(id);
        console.log(findId)
        if(!findId) return res.status(500).json({message:"This product id is not avaliable"});

        const newProduct = await Product.findByIdAndUpdate(id,{
            ...(name && {name}),
            ...(price && {price}),
            ...(type && {type}),
            ...(body && {body}),
            ...(imageUrl && {photo: imageUrl})  
        },{new:true})
        res.send({message:"Successfully, Product has been Updated",newProduct})

    } catch (error) {
        res.status(500).json({message:"Error in productEdit file", error:error.message})
    }
}

module.exports = productEdit