const jwt = require('jsonwebtoken');

module.exports = function (req, res, next){
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('Access Denied, No Token found')
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECREAT);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({message:"Invalid Token"});
    }
}