const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Blog = require('../models/blog');
const { addBlog } = require('../controllers/blogCreate');
const multer = require('multer');
const verifyToken = require('../middleware/verifyToken');
const verifyAdmin = require('../middleware/verifyAdmin');
const { blogRead } = require('../controllers/blogRead');
const { blogReadId } = require('../controllers/blogReadId');
const { blogEdit } = require('../controllers/blodEdit');
const { deleteBlog } = require('../controllers/blogDelete');

// Multer file handling 
const upload = multer({storage: multer.memoryStorage()});


//Read all blog
router.get('/read',blogRead);
//Read blog by id
router.get('/read/:id',blogReadId)

// If Admin, then

// add blog
router.post('/create',verifyToken,verifyAdmin,upload.single('image'),addBlog)

// edit/update blog by id
router.put('/edit/:id',verifyToken,verifyAdmin,upload.single('image'),blogEdit)

// delete blog by id
router.delete('/delete/:id',verifyToken,verifyAdmin,deleteBlog)


module.exports=router