const express = require('express');
const cors = require('cors');
const Product = require('../db/models/productModel');
const router = new express.Router();
const company = require('../db/models/companies');
const fs = require('file-system');

router.use(cors());
router.post('/product',async (req,res) => {
   console.log(req.body);
   const product = await new Product(req.body);
   try{
      product.save();
      res.status(200).send(product);
   }catch (e) {
      res.status(500).send(e);
   }

});
router.post('/product/img',async (req,res)=>{
   const img = req.body;
   fs.writeFileSync('img',img);

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
   console.log(req.body);

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

router.put("/api/update/:id",async(req,res)=>{
   const {title,company,price} = req.body;
   const productFields = {};
   if(title) productFields.title = title;
   if(company) productFields.company = company;
   if(price) productFields.price = price;

   try{
      let product = await Product.findById(req.params.id);
      if(!product){
         res.status(400).json({msg:'product not found'});
      }
      product = await Product.findByIdAndUpdate(req.params.id,
         {$set: productFields},
         {new: true}
         );
      res.json(product);
   }catch (e) {
      console.log(e.message);
      res.status(500).send('Server error');
   }
});


router.get('/compeanies',async(req,res)=>{
   try{
      console.log('find compeanies');
      const companies = await company.find({});
   
      if(!companies){
         return res.status(401).send("companies not found");
      }
      res.status(201).json(companies);
   }catch(e){
         res.status(401).send({e:e.message});
   }
});

router.patch('/companies/:title',async (req,res)=>{
   const _title = req.params.title;
   console.log(_title);
   try{
      const comp = await company.findOne({title:_title});
      console.log(comp);
      comp.count++;
      comp.save().then(()=>{
         res.status(201).send(comp);
      });

   }catch (e) {
      res.status(401).send({e: e.message});
   }
});
module.exports = router;
