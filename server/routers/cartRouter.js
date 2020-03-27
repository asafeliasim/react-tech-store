const express = require('express');
const Cart = require('../db/models/cartModel');
const router = new express.Router();

// TODO:
// * update cart by increase the correct counter of the product
// * create get function for every single product counter to give to the static


router.post('/cart',async (req,res) => {
   const cart = await new Cart(req.body);
   try{
       cart.save();
       res.status(200).send(cart);
   }catch (e) {
       res.status(500).send(e);
   }

});

router.get('/cart',async(req,res) => {
    try{
        const cart = await Cart.find({});
        if(!cart){
            throw new Error('cart not found');
        }
        res.status(200).send(cart);
    }catch (e) {
        res.status(500).send(e);
    }

});

router.delete('/cart',async(req,res) => {
   try{
        const cart = await Cart.findOne({});
        if(!cart){
            throw new Error('cart not found');
        }
        cart.delete();
        res.status(200).send(cart);
   }catch (e) {
       res.status(500).send(e);
   }

});




module.exports = router;
