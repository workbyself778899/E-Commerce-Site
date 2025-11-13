const Product = require("../models/product");

const seeProduct = async(req,res)=>{
  
    try {
          const getProduct = await Product.find();
          res.send({message:"All product obtained", getProduct})
    } catch (error) {
        res.status(500).json({message:"Error in productReadAll file",error:error.message});
    }

}
module.exports=seeProduct;