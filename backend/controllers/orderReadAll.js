const Order = require('../models/order')

const orderReadAll = async(req,res)=>{
    try {
        const getOrder = await Order.find();
        if(!getOrder) return res.json({message:"Didn't find the order"});
        res.send({ message:"Order Found",getOrder })
    } catch (error) {
        res.status(500).json({message:"Error in orderReadAll", error: error.message})
    }
    
}

module.exports = orderReadAll