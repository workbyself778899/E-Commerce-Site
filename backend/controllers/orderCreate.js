const Order = require('../models/order');

const orderCreate = async (req, res) => {
  try {
    const {
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
      total_cost
    } = req.body;

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
      total_cost,
    });

    await newOrder.save();

    res.status(201).json({
      message: "Successfully created order",
      newOrder,
    });

  } catch (error) {
    res.status(500).json({
      message: "Error creating order",
      error: error.message,
    });
  }
};

module.exports = orderCreate;