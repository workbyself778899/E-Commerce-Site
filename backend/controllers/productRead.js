const Product = require("../models/product");

const productId = async(req,res)=>{
  
    try {
          const{id} =req.params;
          const getProduct = await Product.findById(id);
          res.send({message:"Given product is obtained", getProduct})
    } catch (error) {
        res.status(500).json({message:"Error in productReadAll file",error:error.message});
    }

}
module.exports=productId;