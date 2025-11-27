const Order = require('../models/order')

const orderReadByUser = async (req, res) => {
  try {
    const userId = req.user && (req.user._id || req.user.id || req.user)
    if (!userId) return res.status(400).json({ message: 'User id not found in token' })
    const orders = await Order.find({ userId })
    res.json({ message: 'User orders found', orders })
  } catch (error) {
    console.error('orderReadByUser error:', error)
    res.status(500).json({ message: 'Error fetching user orders', error: error.message })
  }
}

module.exports = orderReadByUser
