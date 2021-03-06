const express = require('express');
const router = express.Router();
const {check,validationResult} = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

const User = require('../db/models/userModel');
// @route       Get api/auth
// @desc        Get logged in user
// @access      Private

router.get('/api/user',auth,async (req,res)=>{
    try{
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    }catch (e) {
        console.error(e.message);
        res.status(500).send('Server error');
    }
});

// @route       Post api/auth
// @desc        Auth user & get token
// @access      Public

router.post('/api/login',
    [
            check('email','Please include a valid email').isEmail(),
            check('password','Password is required').exists()
         ],
    async(req,res)=>{
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                res.status(400).json({errors:errors.array()})
            }
            const {email,password} = req.body;

            try{
                let user = await User.findOne({email});

                if(!user){
                    return res.status(400).json({msg:'Invalid credentials'})
                }

                const isMatch = await bcrypt.compare(password,user.password);
                if(!isMatch){
                    return res.status(400).json({msg:'Invalid credentials'})
                }
                const payload = {
                    user:{
                        id: user._id,
                        isAdmin: user.isAdmin
                    }
                };

                jwt.sign(payload,'user_secret_token',{
                    expiresIn: 360000
                },(err,token)=>{
                    if(err)throw (err);
                    res.json({user,token});
                });
            }catch (e) {
                console.error(e.message);
                res.status(500).send('Server error');
            }
});

module.exports = router;
