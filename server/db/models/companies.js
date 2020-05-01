const mongoose = require('mongoose');


const company = mongoose.model('companies',{

        title:String,
        count:Number

    }
);

module.exports = company;

