const express = require('express');
const cors = require('cors');
const Product = require('../db/models/productModel');
const router = new express.Router();

router.use(cors());
router.post('/product',async (req,res) => {
   const product = await new Product(req.body);
   try{
      product.save();
      res.status(200).send(product);
   }catch (e) {
      res.status(500).send(e);
   }

});

router.get('/product/:title',async(req,res)=>{
   const _title = req.params.title;
   try{
      const product = await Product.findOne({title:_title});
      if(!product){
         throw new Error('Product not found');
      }
      res.status(200).send(product);
   }catch (e) {
      res.status(500).send(e);
   }
});
router.get('/products', async (req,res)=>{
   try{
      const products = await Product.find({});
      if(!products){
         throw new Error('Products are empty');
      }
      res.status(200).send(products);
   }catch (e) {
      res.status(500).send(e);
   }
});
router.patch('/product/:title',async(req,res)=>{
   const updates = Object.keys(req.body);
   const allowsUpdates = ['id','title','price','company','featured','img','countOfBuy'];
   const isValidOperation  = updates.every((update)=> allowsUpdates.includes(update));
   const _title = req.params.title;
   if(!isValidOperation){
      return res.status(400).send({error: 'Invalid update'});
   }
   try{
      const product = await Product.findOneAndUpdate({title:_title},req.body,{new:true,runValidation:true});
      res.status(200).send(product);
   }catch (e) {
      res.status(500).send(e);
   }
});
router.delete('/product/:title', async (req,res)=>{
   try{
      const _title = req.params.title;
      const product = await Product.findOneAndDelete({title:_title});
      if(!product){
         return res.send("Product isn't exist");
      }
      res.status(200).send(`${_title} has deleted`);
   }catch (e) {
      res.status(500).send(e);
   }
});
router.get('/img/:path',(req, res) => {
   res.send(req);
});
module.exports = router;
