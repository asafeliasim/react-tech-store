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
/*
const upload = multer({
    dest: 'images'
});
router.post('/products/:title/Buffer',upload.single('upload'),async(req, res) =>{
    req.body.title = req.file.buffer
    res.send();
});
*/

module.exports = router;
