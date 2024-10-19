const express = require('express');
const router = express.Router();
const userAuth  = require("./../middleware/auth")
const {addParkingSpot, findParkingSpotsByLotId,updateParkingSpotAvailability} = require("./../controllers/parkingSpotController");



router.post('/add', userAuth, addParkingSpot);
router.get("/getParkingSpots/:lotId", userAuth, findParkingSpotsByLotId)
router.patch("/update/:spotId",userAuth, updateParkingSpotAvailability)

module.exports = router;

