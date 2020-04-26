const express = require('express');
const User = require('../db/models/userModel');
const auth = require('../middleware/auth');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const session = require('express-session');
const flash = require('connect-flash');
const router = new express.Router();


// Create user - Post
// Get user
// Delete User
// Get users -
// Updated user

passport.use(new Strategy(
    (username,passport,done)=>{
        User.findOne({username},(err,user)=>{
            if(err){
                return done(err)
            }
            if(!user){
                done(null,false);
            }
            if(user.password !== password){
                return done(null,false);
            }

            return done(null,user);
        })
    }
));

passport.serializeUser((user,done)=>{
   done(null,user._id);
});

passport.deserializeUser((id,done)=>{
   done(null,{id});
});

router.use(session({
    secret : 'session secret',
    resave : false,
    saveUninitialized: false
}));
router.use(passport.initialize());
router.use(passport.session());
router.use(flash());
router.post('/user',async (req,res)=>{
    const user = new User(req.body);
    try{
        await user.save();
        const token = user.generateAuthToken();
        res.status(200).send({user,token});
    }catch (e) {
        res.status(500).send(e);
    }

});
// login with exists user
router.post('/user/login',async (req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password);
        const token = await user.generateAuthToken();
        res.send({user: user,token});
    }catch (e) {
        res.status(400).send("Error: " + e);
    }
});

router.post('/user/logout', auth ,async(req,res)=>{
    try{
        console.log('1111');
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        });
        await req.user.save();
        res.send();
    }catch (e) {
        res.status(500).send("Error :" + e);
    }
});

router.delete('/user/me',auth, async (req,res)=>{
  try
  {
   //const user = await User.findOneAndDelete(req.user._id);
    await req.user.remove();
    res.status(200).send("User deleted");
  }catch(e){
        res.status(501).send("Error :" + e);
  }
});

router.get('/user/:email',auth,async (req,res)=>{
   const _email = req.params.email;
   try{
       const user = await User.findOne({email:_email});
       if(!user){
           throw new Error("User isn't exists!!!")
       }
       res.status(200).send(user);
   }catch (e) {
       res.status(501).send("Error :" + e);
   }

});

router.patch('/user/me',auth,async (req,res)=>{
    const updates = Object.keys(req.body);
    const allowsUpdates = ['id','userName','email','password'];
    const isValidOperation  = updates.every((update)=> allowsUpdates.includes(update));
    const _id = req.params.id;
    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid update'});
    }
    try{

        updates.forEach((update)=>{
           req.user[update] = req.body[update];
        });
        await req.user.save();

        res.status(200).send('user updated\n' + req.user);
    }catch (e) {
        res.status(501).send("Error :" + e);
    }
});
router.post('/users/logoutAll',auth, async (req, res) => {
   try{
       req.user.tokens = [];
       await req.user.save();
       res.status(200).send();
   }catch (e) {
       res.status(501).send();
   }
});
module.exports = router;
