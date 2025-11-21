const { addProduct } = require('../controllers/productCreate');
const multer = require("multer");
const verifyToken = require('../middleware/verifyToken');
const verifyAdmin = require('../middleware/verifyAdmin');
const seeProduct = require('../controllers/productReadAll');
const productId = require('../controllers/productRead');
const productEdit = require('../controllers/productEdit');
const deleteProduct = require('../controllers/productDelete');
const router = require('express').Router();


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


module.exports=router