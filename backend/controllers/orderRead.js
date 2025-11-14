const Order = require('../models/order')

const orderRead = async(req,res)=>{
   try {
     const {id} = req.params;
    const getOrder = await Order.findById(id);
            if(!getOrder) return res.json({message:"Didn't find the order"});
            res.send({ message:"Given, Order is Found",getOrder })
   } catch (error) {
    res.status(500).json({message:"Error in orderRead file", error: error.message})
   }
    
}

module.exports = orderRead