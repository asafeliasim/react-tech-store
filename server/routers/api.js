const express = require('express');
//const multer = require('multer');
const Products = require('../db/models/productModel');


const router = new express.Router();



router.get('/productsApi',async (req,res)=>{
    try{
        const products = await Products.find({});
        if(!products){
            console.log('No users');
        }
        res.status(200).send(products);
    }catch (e) {
        res.status(404).send(e);
    }
});


module.exports = router;
