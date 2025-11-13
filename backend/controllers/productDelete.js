const Product = require("../models/product");
const deleteProduct = async(req,res)=>{
    try {
        const {id} = req.params;
        const data = await Product.findByIdAndDelete(id);
        if(!data) res.send({message:"Blog is not Deleted"})

             res.send({message:"Successfully, Product is deleted",data});
    } catch (error) {
        res.status(500).json({message:"Error in productDelete file ", error:error.message})
    }
}

module.exports = deleteProduct