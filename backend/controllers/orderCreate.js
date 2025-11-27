const Order = require('../models/order');

const orderCreate = async (req, res) => {
  try {
    // support incoming shapes: product OR products
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
      products,
      company_name,
      details,
      zip_code,
      total_cost,
      userId,
    } = req.body;

    // normalize incoming product(s) to schema.products
    const incoming = products || product || [];
    const productsArr = Array.isArray(incoming)
      ? incoming.map((it) => {
          // handle server cart shape: { productId: { _id, name, price, photo }, quantity }
          const prodObj = it.productId || it;
          const idValue = prodObj && (prodObj._id || prodObj.id) ? (prodObj._id || prodObj.id) : (it._id || it.id || null);
          const nameValue = (prodObj && prodObj.name) || it.name || '';
          const priceValue = (prodObj && prodObj.price) || it.price || 0;
          const photoValue = (prodObj && prodObj.photo) || prodObj && prodObj.image || it.photo || '';
          return {
            productId: idValue,
            name: nameValue,
            price: Number(priceValue) || 0,
            quantity: Number(it.quantity) || Number(it.qty) || 1,
            photo: photoValue,
          };
        })
      : [];

    // compute total cost if not provided
    let total = Number(total_cost) || 0;
    if (!total && productsArr.length) {
      total = productsArr.reduce((s, p) => s + (Number(p.price) || 0) * (Number(p.quantity) || 1), 0);
    }

    const newOrder = new Order({
      ...(userId && { userId }),
      customer: {
        fname,
        lname,
        email,
        phone: phone ? Number(phone) : undefined,
        country,
        city,
        province,
        address,
        zip_code,
        company_name,
        details,
      },
      products: productsArr,
      total_cost: total,
    });

    await newOrder.save();

    res.status(201).json({ message: 'Successfully created order', newOrder });
  } catch (error) {
    console.error('orderCreate error:', error);
    res.status(500).json({ message: 'Error creating order', error: error.message });
  }
};

module.exports = orderCreate;