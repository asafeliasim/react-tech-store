const jwt = require('jsonwebtoken');

module.exports = function (req,res,next) {
    //Get token from header
    const token = req.header('x-auth-token');

    //Check if not token
    if(!token){
        return res.status(401).json({msg:'No token authorization denied'})
    }
    try{
        const decode = jwt.verify(token,'user_secret_token');
        req.user = decode.user;
        next();
    }catch (e) {
        res.status(500).json({msg:'Token is not valid!'})
    }
};
