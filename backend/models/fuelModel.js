const mongoose = require('mongoose');

const fuelSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
    },
    price: {
        type: String,
        required: [true, 'price is required'],
    },
    price_full: {
        type: String,
        required: [true, 'price full is required'],
    },
    price_eilat: {
        type: String,
        required: [true, 'price eilat is required'],
    },
    price_eilat_full: {
        type: String,
        required: [true, 'price eilat full is required'],
    },
    date: {
        type: Date,
        required: [true, 'date is required'],
        unique: true,
    },
    difference: {
        type: String,
        required: [true, 'difference is required'],
    },
    difference_full: {
        type: String,
        required: [true, 'difference full is required'],
    },
    difference_eilat: {
        type: String,
        required: [true, 'difference eilat is required'],
    },
    difference_eilat_full: {
        type: String,
        required: [true, 'difference eilat full is required'],
    },
}, {
    timestamps: true
});


module.exports = mongoose.model('Fuel', fuelSchema);