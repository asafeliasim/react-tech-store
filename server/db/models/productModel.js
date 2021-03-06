const mongoose = require('mongoose');

const productModel = mongoose.model('products',{
    id:{
        type: Number,
        isRequired: true
    },
    title:{
        type: String,
        isRequired: true
    },
    price: {
        type: Number,
        isRequired:true
    },
    company: {
        type: String,
    },
    featured:{
        type: Boolean,
        default: true
    },
    img:{
        type: String,
    },
    countOfBuy:{
        type: Number,
        default: 0
    }
});

module.exports= productModel;
