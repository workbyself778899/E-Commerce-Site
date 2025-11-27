const Order = require('../models/order')

const orderUpdate = async (req, res) => {
  try {
    const { id } = req.params
    const updates = req.body // e.g., { order_status: 'Shipped', payment_status: 'Paid' }

    const order = await Order.findById(id)
    if (!order) return res.status(404).json({ message: 'Order not found' })

    // Apply allowed updates
    const allowed = ['order_status', 'payment_status']
    allowed.forEach((field) => {
      if (updates[field] !== undefined) order[field] = updates[field]
    })

    await order.save()
    res.json({ message: 'Order updated', order })
  } catch (error) {
    console.error('orderUpdate error:', error)
    res.status(500).json({ message: 'Error updating order', error: error.message })
  }
}

module.exports = orderUpdate
