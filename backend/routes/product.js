const { addProduct } = require('../controllers/productCreate');
const multer = require("multer");
const verifyToken = require('../middleware/verifyToken');
const verifyAdmin = require('../middleware/verifyAdmin');
const seeProduct = require('../controllers/productReadAll');
const productId = require('../controllers/productRead');
const productEdit = require('../controllers/productEdit');
const deleteProduct = require('../controllers/productDelete');
const router = require('express').Router()
const Product = require('../models/product')


const upload = multer({storage: multer.memoryStorage()});

// add the product
router.post('/add',verifyToken,verifyAdmin,upload.single('photo'),addProduct)   

// Edit the product
router.put('/edit/:id',verifyToken,verifyAdmin,upload.single('photo'),productEdit)

//Delete the product
router.delete('/delete/:id',verifyToken,verifyAdmin,deleteProduct)

// Get all product 
router.get('/get-all',seeProduct);
// Get product by id
router.get('/get-one/:id',productId);

// Get product by type 
// GET /products/type/:type
router.get('/type/:type', async (req, res) => {
  try {
    const { type } = req.params;

    // Validate if the type is allowed
    const validTypes = ["Table", "Chair", "Sofa", "Hybrid"];
    if (!validTypes.includes(type)) {
      return res.status(400).json({ message: "Invalid product type" });
    }

    // Find all products having this type
    const products = await Product.find({ type });

    res.status(200).json({
      message: "Products fetched successfully",
      products
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports=router