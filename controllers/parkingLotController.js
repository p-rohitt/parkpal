const mongoose = require("mongoose");
const { ParkingLot } = require("./../models/parkinglot");

const createParkingLot = async (req, res) => {
  const {name, totalSpots, availableSpots,levels, location } = req.body;
  const { user } = req.user;

  const v = await getVehicleByVehicleNo(vehicleNo);

  if(v !== null){
    res.status(404).send({error: "Vehicle number already registered!"});
    return;
  }

  const newVehicle = new Vehicle({
    vehicleNo: vehicleNo,
    owner_name: owner_name, // Assuming owner's name is the user's email
    owner_address: owner_address,
    type: type,
  });

  // Save the vehicle to the database
  await newVehicle.save();

  console.log(req.user)
  // Add the vehicle's ObjectId to the user's vehicles array
  req.user.vehicles.push(newVehicle.vehicleNo);

  // Save the updated user document
  await req.user.save();

  res.status(201).json({ message: "Vehicle registered successfully",
    vehicle: newVehicle,
    user: req.user, });

    return;
};


module.exports = {registerVehicle};
