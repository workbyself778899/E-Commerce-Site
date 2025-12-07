const express = require('express');
const User = require('../models/user');
const { requestPasswordReset } = require('../controllers/requestPasswordReset');
const { resetPassword } = require('../controllers/resetPassword');
const router = express.Router();
const bcrypt= require('bcrypt');
const { editUser } = require('../controllers/editUser');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/verifyToken');
const nodemailer = require("nodemailer");


// Register user
router.post('/register',async(req,res)=>{
    const {email, username, password} = req.body;
   
   try {
    // if email exist 
     const getEmail = await User.findOne({email})
    if(getEmail) return res.status(409).json({message:"Email Already exist"})
        const getUser = await User.findOne({username});
    if(getUser) return res.status(409).json({message:"Username already exist"})

        // this Password doesn't work because of encryption 
     const newUser = new User({
        username,
        email,
        password :"nopassword"
    })
    await newUser.save();
    requestPasswordReset(email)
     return res.status(201).json({
      message: "Successfully, User is register check your email",
      user: newUser,
    });
   } catch (error) {
     return res.status(500).json({
      message: "Internal Server Error",
      error,
    });
   }
})

// Multer file handling 
const upload = multer({storage: multer.memoryStorage()});

// login 
router.post('/login',  async(req,res)=>{
    const {email, password} =req.body;
    const findEmail = await User.findOne({email});
    if(!findEmail) return res.status(400).json({message:"Email dosen't exist"})
try {
    
    const checkPassword = await bcrypt.compare(password, findEmail.password)
    if(!checkPassword) return res.status(400).json({message:"Invalid data for login"})

        // Token for user 
    const token = jwt.sign({_id:findEmail._id},process.env.TOKEN_SECREAT);
    res.header('auth-token', token).send({message:"User is logeed In", token,findEmail})
} catch (error) {
    console.log(error)
}
})

// Forget password
router.post("/enter-email",async(req,res)=>{
  const {email} = req.body;
   const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: "User doesn't exist" });
    try {
      const secret = process.env.JWT + user.password;
      
      const token = jwt.sign({ id: user._id, email: user.email }, secret, { expiresIn: '30d' });
  
       const resetURL = `https://e-commerce-site-three-kappa.vercel.app//user/reset/${user._id}/${token}`;
  
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'ayush.email.977@gmail.com',
          pass: process.env.PASSWORD,
        },
      });
  
      const mailOptions = {
        to: user.email,
        from: process.env.EMAIL,
        subject: 'Password Reset Request',
        text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
        Please click on the following link, or paste this into your browser to complete the process:\n\n
        ${resetURL}\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n`,
      };
  
      await transporter.sendMail(mailOptions);
      res.send({message:'Password reset link  sent to your gmail account'})
  
    } catch (error) {
      console.log(error)
      res.status(500).json({message:'Error in requestPasswordReset' ,error: error.message}) 
    }
})

// router.post("/pr",requestPasswordReset);
router.post("/reset/:id/:token",resetPassword);

router.put('/edit',verifyToken ,upload.single('image'),editUser)

// Get user details
router.get('/details/:id',async(req,res)=>{
try {
        const {id} = req.params;
    const user = await User.findById(id).select('-password');
    res.status(200).json({message:"See the user", user})
} catch (error) {
    res.send(error);
}

})

// Add to Cart
router.post('/add-to-cart/:id', async (req, res) => {
  try {
    const userId = req.params.id;   // User ID
    const { productId, quantity } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check if product exists in cart
    const productIndex = user.cart.findIndex((item) =>
      item.productId.toString() === productId
    );

      // insert new product
      user.cart.push({ productId, quantity});
    

    await user.save();

    res.status(200).json({
      message: "Added to Cart",
      cart: user.cart
    });

  } catch (error) {
    res.status(500).json({
      message: "Error in Add to Cart API",
      error: error.message
    });
  }
});

// Get all the product in cart
router.get("/get-cart/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).populate("cart.productId");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      message: "Cart fetched",
      cart: user.cart,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart", error: error.message });
  }
});

// Remove product form cart 
router.delete("/remove-from-cart/:userId/:productId", async (req, res) => {
  try {
    const { userId, productId } = req.params;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.cart = user.cart.filter(
      (item) => item.productId.toString() !== productId
    );

    await user.save();

    res.status(200).json({ message: "Item removed from cart", cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: "Error removing cart item", error: error.message });
  }
});


// Add to Favourites 
router.post("/add-to-fav/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { productId } = req.body;

    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    // check if product already exists in favourites
    const exists = user.favourites.some((item) =>
      item.productId.equals(productId)
    );

    if (exists) {
      return res
        .status(200)
        .json({ message: "Already in favourites", favourites: user.favourites });
    }

    // add new product
    user.favourites.push({ productId });

    await user.save();
    res.status(200).json({ message: "Added to favourites", favourites: user.favourites });

  } catch (error) {
    res.status(500).json({ error:"Error in user File",error: error.message });
  }
});

// Get All Favourite Product IDs
router.get("/get-fav-products/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).populate("favourites.productId");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Favourite products fetched",
      favourites: user.favourites
    });

  } catch (error) {
    res.status(500).json({ message: "Error fetching favourite products", error: error.message });
  }
});

// Remove from Favourites 
router.delete("/remove-from-fav/:userId/:productId", async (req, res) => {
  try {
    const { userId, productId } = req.params;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // check if product exists
    const exists = user.favourites.some(
      (item) => item.productId.toString() === productId
    );

    if (!exists) {
      return res.status(404).json({ message: "Product not in favourites" });
    }

    // remove product from favourites
    user.favourites = user.favourites.filter(
      (item) => item.productId.toString() !== productId
    );

    await user.save();

    res.status(200).json({
      message: "Removed from favourites",
      favourites: user.favourites,
    });
  } catch (error) {
    res.status(500).json({ message: "Error in user file", error: error.message });
  }
});


router.get('/all-user', async(req,res)=>{
  try {
    const count = await User.countDocuments();
    res.send({data: count})
  } catch (error) {
    res.status(500).json({error:error.message})
  }
})
module.exports = router;    