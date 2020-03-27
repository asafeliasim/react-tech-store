const express = require('express');
const User = require('../db/models/userModel');
const auth = require('../middleware/auth');
const router =new express.Router();


// Create user - Post
// Get user
// Delete User
// Get users -
// Updated user


//sign-in
/*router.get('/sign-in',(req, res) => {

});*/



router.get('/user/me',auth,async (req,res)=>{
   res.send(req.user);
});




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
