const User = require('../models/user')
module.exports = async function (req,res,next){
try {
        const currentUserId = req.user
    const findUser = await User.findById(currentUserId._id).select('-password, -cart, -favorites, -updatedAt, -__v,-image')
    // console.log(findUser)

    if(findUser.role=="admin") next()
        
    else return res.send({message:"Admin can only use this path"})
} catch (error) {
    res.status(500).json({message:"Problem in middleware Verify"})
}
}