const jwt = require('jsonwebtoken');
const User = require('../db/models/userModel');

// find a user with the same id that have the current token
const auth = async (req,res,next) => {
    try{
        const token = req.header('Authorization').replace('Bearer ', '');

        const decode = jwt.verify(token,'thisIsCurrentUser');
      //  console.log(decode);

        const user = await User.findOne({ _id: decode._id, 'tokens.token': token});
       // console.log(user._id,user.tokens);
        if(!user){
            throw new Error('user not found');
        }
        req.token = token;
        req.user = user;
        console.log('Authorization is good');
        next();
    }catch (e) {
        res.status(401).send({error:'Please authenticate.'})
    }

};


module.exports = auth;
