const mongoose = require("mongoose");
const { ParkingSpot} = require("./../models/parkingSpot");

const addParkingSpot = async (req, res) => {
  const {lotId,level,available,spotId, location} = req.body;
  const { user } = req.user;

  const newLot = new ParkingSpot({
    lotId,level,available,spotId,location
  });

  // Save the vehicle to the database
  await newLot.save();

  res.status(201).json({ message: "Spot created successfully",
    lot: newLot });

    return;
};


const findParkingSpotsByLotId = async (req,res) => {
  const { lotId } = req.params;

  try {
    const parkingSpots = await ParkingSpot.find({ lotId: lotId }).exec();

    if (!parkingSpots.length) {
      return res.status(404).json({ message: 'No parking spots found for this parking lot' });
    }

    res.json({ parkingSpots });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching parking spots' });
  }


}

const updateParkingSpotAvailability = async (req, res) => {
  const { spotId } = req.params;
  const { available } = req.body;

  try {
    const parkingSpot = await ParkingSpot.findById(spotId);
    if (!parkingSpot) {
      return res.status(404).json({ message: "Parking spot not found" });
    }

    parkingSpot.available = available;
    await parkingSpot.save();

    res.json({ message: "Parking spot updated", parkingSpot });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the parking spot" });
  }
};



module.exports = {addParkingSpot,findParkingSpotsByLotId,updateParkingSpotAvailability};
