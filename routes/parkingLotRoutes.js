const express = require('express');
const router = express.Router();
const userAuth  = require("./../middleware/auth")
const {createParkingLot, getParkingLotById} = require("./../controllers/parkingLotController");
const {getParkingLots} = require("./../controllers/parkingLotController");



router.post('/create', userAuth, createParkingLot);
router.post("/getParkingLots", userAuth, getParkingLots);
router.get("/:id",getParkingLotById) // userAuth hataya hu
module.exports = router;

