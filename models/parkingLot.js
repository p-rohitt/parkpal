// models/user.js
const mongoose = require('mongoose');

const parkingLotSchema = new mongoose.Schema({
    LotId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    totalSpots: {
        type: Number,
        required: true
    },
    availableSpots:{
        type:Number,
        required:true
    },
    levels:{
        type:Number,
        required:true
    },
    location: {
        type: 'Point',
        coordinates: {
          type: [Number],
          required: true
        }
      }
});


const ParkingLot = mongoose.model('parkingLot', parkingLotSchema);

// Service functions


module.exports = { ParkingLot };

