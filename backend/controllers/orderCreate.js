const Order = require('../models/order')

const orderCreate = async(req,res)=>{
    try {
        const {fname, lname, country, city, province, address, phone, email, product, company_name, details, zip_code} =req.body;

        const newOrder = new Order({
            fname,
            lname,
            country,
            city,
            province,
            address,
            phone,
            email,
            product,
            company_name,
            details,
            zip_code,
        })
        await newOrder.save();
        res.send({message:"Successfully, Order has been Created",newOrder})
    } catch (error) {
        res.status(500).json({message:"Error in orderCreate file", error: error.message})
    }
    
}

module.exports = orderCreate