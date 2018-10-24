const mongoose = require('mongoose');
const User = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password_hash: {
        type: String,
        unique: true
    },
    is_admin: {
        type: Boolean,
        default: false
    },
    is_authenticated: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('User', User);