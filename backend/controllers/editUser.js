const User = require('../models/user')
const ImageKit = require('@imagekit/nodejs')
require('dotenv').config();

// ImageKit configuartion 
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

const editUser = async(req,res)=>{
    try {
    let imageUrl;
    if(req.file){
              // Upload only if image is provided
           const result = await imagekit.files.upload({
            file: req.file.buffer.toString('base64'),
             fileName: req.file.originalname,
        })
    // Get the image url after the upload in ImageKit
     imageUrl = result.url
    }

    const {id} = req.query   //Take User Id
    const { username }= req.body
    const getUser = await User.findOne({username});
    if(getUser==username) return res.send({message:"This username already exist"});
    const newUser = await User.findByIdAndUpdate(id,{
       ...( username &&  {username:username}),
        ...(imageUrl && {image: imageUrl})
    },{new:true})
    res.status(200).json({message:"Success in user edit ",newUser})
    } catch (error) {
        res.status(500).json({error: error.message})
    }

}
module.exports={editUser}