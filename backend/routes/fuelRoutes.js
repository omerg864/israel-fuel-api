const express = require('express');
const router = express.Router();
const { getFuelData, setFuelData, updateFuelData, deleteFuelData } = require('../controllers/fuelController');
const {protect, admin_protected} = require('../middleWare/authMiddleware');

router.route('/:token').get(protect, getFuelData).post(admin_protected, setFuelData);

router.route('/:token/:id').put(admin_protected, updateFuelData).delete(admin_protected, deleteFuelData);

module.exports = router;