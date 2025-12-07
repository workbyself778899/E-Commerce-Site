const nodemailer = require("nodemailer");
const bycrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/user')


 const requestPasswordReset = async (email) => {
  const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User doesn't exist" });
  try {
    const secret = process.env.JWT + user.password;
    
    const token = jwt.sign({ id: user._id, email: user.email }, secret, { expiresIn: '30d' });

     const resetURL = `https://e-commerce-site-three-kappa.vercel.app/user/reset/${user._id}/${token}`;

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
    return 'Password reset link sent'

  } catch (error) {
    console.log(error)
    return 'Error in requestPasswordReset'
  }
}; 
 
module.exports= {requestPasswordReset}