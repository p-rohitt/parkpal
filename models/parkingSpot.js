// models/user.js
const mongoose = require("mongoose");
const ParkingLot = require("./parkinglot");
const parkingSpotSchema = new mongoose.Schema({
  level: {
    type: String,
    required: true,
  },
  lotId: {
    type: mongoose.Types.ObjectId,
    ref: "ParkingLot",
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  type: {
    type: String,
    enum: ["four", "two"],
    required: true,
  },
});

// Post-save middleware to update totalSpots and availableSpots
parkingSpotSchema.post("save", async function (doc) {
  console.log(ParkingLot.ParkingLot);
  const parkingLot = await ParkingLot.ParkingLot.findById(doc.lotId);
  if (parkingLot) {
    if (doc.isNew) {
      parkingLot.totalSpots += 1;
    }
    if (doc.available && doc.isNew) {
      parkingLot.availableSpots += 1;
    }
    await parkingLot.save();
  }
});

// Post-remove middleware to update totalSpots and availableSpots
parkingSpotSchema.post("remove", async function (doc) {
  const parkingLot = await ParkingLot.ParkingLot.findById(doc.lotId);
  if (parkingLot) {
    parkingLot.totalSpots -= 1;
    if (doc.available) {
      parkingLot.availableSpots -= 1;
    }
    await parkingLot.save();
  }
});

// Pre-save middleware to handle availability changes
parkingSpotSchema.pre("save", async function (next) {
  if (!this.isNew) {
    const currentSpot = await ParkingSpot.findById(this._id);
    if (currentSpot && currentSpot.available !== this.available) {
      const parkingLot = await ParkingLot.ParkingLot.findById(this.lotId);
      if (parkingLot) {
        if (this.available) {
          parkingLot.availableSpots += 1;
        } else {
          parkingLot.availableSpots -= 1;
        }
        await parkingLot.save();
      }
    }
  }
  next();
});

const ParkingSpot = mongoose.model("parkingSpot", parkingSpotSchema);

// Service functions

module.exports = { ParkingSpot };
