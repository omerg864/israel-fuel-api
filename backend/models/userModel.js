const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'password is required'],
    },
    position: {
        type: String,
        required: [true, 'position is required'],
    },
    api_token: {
        type: String,
        required: false,
    },
    verification: {
        type: Boolean,
        required: false,
        default: false,
    },
}, {
    timestamps: true
});


module.exports = mongoose.model('User', userSchema);