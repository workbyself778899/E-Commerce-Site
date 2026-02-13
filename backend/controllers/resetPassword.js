const User = require('../models/user');

const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



 const resetPassword = async (req, res) => {
  // id = userId 
  const { id, token } = req.params;
  const { password } = req.body;
  const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(400).json({ message: "User not exists!" });
    }
  try {
    const secret = process.env.JWT + user.password;
    const verify = jwt.verify(token, secret);
    const encryptedPassword = await bcrypt.hash(password, 10);
    await User.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          password: encryptedPassword,
        },
      }
    );

    res.status(200).json({ message: 'Password has been reset' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = {resetPassword}