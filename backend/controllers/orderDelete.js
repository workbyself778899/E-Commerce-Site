const Order = require('../models/order')

const orderDelete = async(req,res)=>{
   try {
     const {id} = req.params;
    const data = await Order.findByIdAndDelete(id)
      if(!data) return res.send({message:"Blog is not Deleted"})

             res.send({message:"Successfully, Order is deleted",data});
   } catch (error) {
    res.status(500).json({message:"Error in orderDelete file ", error:error.message})
   }
}

module.exports = orderDelete