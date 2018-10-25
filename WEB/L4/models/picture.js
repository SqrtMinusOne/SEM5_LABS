const mongoose = require('mongoose');
const Picture = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    sold_price:{
        type: Number,
        default: 0
    },
    buyer: {
        type: String,
        default: ""
    },
    start_price: {
        type: Number,
        required: true
    },
    min_step: {
        type: Number,
        required: true
    },
    max_step: {
        type: Number,
        required: true
    },
    for_auction: {
        type: Number,
        required: true
    },
});

module.exports = mongoose.model('Picture', Picture);