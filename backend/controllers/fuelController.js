const asyncHandler = require('express-async-handler');

const Fuel = require('../models/fuelModel');

const getFuelData = asyncHandler(async (req, res) => {
    const fuelData = await Fuel.find();
    res.status(200).json(fuelData);
  })


const setFuelData = asyncHandler(async (req, res) => {
    if (req.body){
    const fuel = await Fuel.create(req.body);
    res.status(200).json(fuel);
    }
    else{
        res.status(400).json({
            message: 'Please provide a valid input'
        })
    }
})

const updateFuelData = asyncHandler(async (req, res) => {
    if (req.params.date && req.body) {
    date = new Date(req.params.date);
    const fuel = await Fuel.findOneAndUpdate({date: date}, req.body, {new: true});
    res.status(200).json(fuel);
    }
    else{
        res.status(400).json({
            message: 'Please provide a valid input'
        })
    }
})

const deleteFuelData = asyncHandler(async (req, res) => {
    if (req.params.date) {
        date = new Date(req.params.date);
        const fuel = await Fuel.findOneAndDelete({date: date});
        if (!fuel) {
            res.status(404).json({
                message: 'Fuel not found'
            });
        } else {
        res.status(200).json(fuel);
        }
    }else{
        res.status(400).json({
            message: 'Please provide a date'
        });
    }
})

module.exports = {
    getFuelData,
    setFuelData,
    updateFuelData,
    deleteFuelData
}