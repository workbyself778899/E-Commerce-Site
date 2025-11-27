const orderCreate = require('../controllers/orderCreate');
const orderDelete = require('../controllers/orderDelete');
const orderRead = require('../controllers/orderRead');
const orderReadAll = require('../controllers/orderReadAll');
const orderUpdate = require('../controllers/orderUpdate');
const router = require('express').Router();
const verifyToken = require('../middleware/verifyToken');
const verifyAdmin = require('../middleware/verifyAdmin');

// Add order (public)
router.post('/add', orderCreate)


// Admin: Read all orders
router.get('/all', verifyToken, verifyAdmin, orderReadAll)

// Read single order (admin)
router.get('/one/:id', verifyToken, verifyAdmin, orderRead)

// Get orders for authenticated user
const orderReadByUser = require('../controllers/orderReadByUser')
router.get('/user', verifyToken, orderReadByUser)

// Admin: Update order (status/payment)
router.put('/update/:id', verifyToken, verifyAdmin, orderUpdate)

// Admin: Delete order
router.delete('/delete/:id', verifyToken, verifyAdmin, orderDelete)

module.exports = router