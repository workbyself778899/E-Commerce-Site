const express = require('express')
const router = express.Router()
const { getFeatured, addFeatured, removeFeatured } = require('../controllers/featuredController')
const verifyToken = require('../middleware/verifyToken')
const verifyAdmin = require('../middleware/verifyAdmin')

// Public read
router.get('/read', getFeatured)

// Admin add
router.post('/add', verifyToken, verifyAdmin, addFeatured)

// Admin remove
router.delete('/remove/:section/:productId', verifyToken, verifyAdmin, removeFeatured)

module.exports = router
