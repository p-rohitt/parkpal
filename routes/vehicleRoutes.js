const express = require('express');
const router = express.Router();
const userAuth  = require("./../middleware/auth")
const {registerVehicle} = require("./../controllers/vehicleController");



router.post('/registerVehicle', userAuth, registerVehicle);

module.exports = router;

