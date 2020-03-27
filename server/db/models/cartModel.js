const mongoose = require('mongoose');

const cart = mongoose.model('cart',{
    phones: {
        type: Number,
        default:0
    },
    cameras: {
        type: Number,
        default:0
    },
    computers: {
        type: Number,
        default:0
    }
});

module.exports= cart;
