const mongoose = require('mongoose');

const Settings = new mongoose.Schema({
    name :{
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    sell_timeout: {
        type: String,
        required: true
    },
    info_interval: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Settings', Settings);