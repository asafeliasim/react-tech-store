const mongoose = require('mongoose');

const branch = mongoose.model('branches',{
    id:{
        type:Number
    },
    address:{
        type: String,
        required:true
    }
});

module.exports= branch;
