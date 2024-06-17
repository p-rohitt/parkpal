const express = require('express');
const router = express.Router();
const userAuth  = require("./../middleware/auth")
const {createParkingLot} = require("./../controllers/parkingLotController");



router.post('/create', userAuth, createParkingLot);

module.exports = router;

