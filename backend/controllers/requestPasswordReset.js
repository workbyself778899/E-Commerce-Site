const nodemailer = require("nodemailer");
const bycrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/user')


 const requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User doesn't exist" });
  try {
  

    const secret = process.env.JWT + user.password;
    
    const token = jwt.sign({ id: user._id, email: user.email }, secret, { expiresIn: '1h' });

     const resetURL = `http://localhost:3900/user/reset/${user._id}/${token}`;

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

    res.status(200).json({ message: 'Password reset link sent' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
}; 

module.exports= {requestPasswordReset}