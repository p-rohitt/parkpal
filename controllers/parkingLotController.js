const mongoose = require("mongoose");
const { ParkingLot } = require("./../models/parkinglot");

const createParkingLot = async (req, res) => {
  const {name, totalSpots, availableSpots,levels, location } = req.body;
  const { user } = req.user;

  const newLot = new ParkingLot({
    name,totalSpots,availableSpots,levels,location
  });

  // Save the vehicle to the database
  await newLot.save();

  res.status(201).json({ message: "Lot created successfully",
    lot: newLot });

    return;
};


module.exports = {createParkingLot};
