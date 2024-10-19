const mongoose = require("mongoose");
const { ParkingLot } = require("../models/parkinglot");
const {ParkingSpot} = require("../models/parkingSpot")
const createParkingLot = async (req, res) => {
  const { name, totalSpots, availableSpots, levels, location } = req.body;
  const { user } = req.user;

  try {
    const newLot = new ParkingLot({
      name,
      totalSpots,
      availableSpots,
      levels,
      location,
    });

    // Save the vehicle to the database
    await newLot.save();

    res.status(201).json({ message: "Lot created successfully", lot: newLot });

    return;
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while creating the parking spot" });
  }
};

const getParkingLots = async (req, res) => {

  console.log("REQ BODY : ",req.body)
  const { location } = req.body;
  const { user } = req.user;

  const nearbyLots = await ParkingLot.aggregate([
    {
      $geoNear: {
        near: {
          type: "Point",
          coordinates: [
            parseFloat(location.longitude),
            parseFloat(location.latitude),
          ],
        },
        distanceField: "distance",
        maxDistance:50000,
        spherical: true,
      },
    },
  ]);

  const nearbyLotsWithDistance = await Promise.all(
    nearbyLots.map(async (lot) => {
      return {
        lot: lot,
        distance: Math.floor(lot.distance),
      };
    })
  );
  // console.log(nearbyLotsWithDistance)
  res.json({ nearbyLots: nearbyLotsWithDistance });
};

const getParkingLotById = async (req, res) => {
  try {
    const { id } = req.params;

    // Convert id to ObjectId if necessary
    const objectId = new mongoose.Types.ObjectId(id);

    // Find the parking lot by its ID
    const parkingLot = await ParkingLot.findById(objectId);

    if (!parkingLot) {
      return res.status(404).json({ message: "Parking lot not found" });
    }

    // Find all available spots in this parking lot
    const availableSpots = await ParkingSpot.find({
      lotId: objectId,
      available: true, // only get available spots
    });

    console.log({ parkingLot, availableSpots });

    res.json({ parkingLot, availableSpots });
  } catch (error) {
    console.error("Error fetching parking lot by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};




module.exports = {
  createParkingLot,
  getParkingLots,
  getParkingLotById
};
