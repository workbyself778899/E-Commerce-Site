const orderCreate = require('../controllers/orderCreate');
const orderDelete = require('../controllers/orderDelete');
const orderRead = require('../controllers/orderRead');
const orderReadAll = require('../controllers/orderReadAll');
const Order = require('../models/product')
const router = require('express').Router();

// Add order
router.post('/add',orderCreate)

// Edit order is not allowed

// Delete order
router.delete('/delete/:id',orderDelete)

// Read order
router.get('/all',orderReadAll)
router.get('/one/:id',orderRead)

module.exports = router