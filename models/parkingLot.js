// models/user.js
const mongoose = require('mongoose');

const parkingLotSchema = new mongoose.Schema({
    lotId: {
        type: String,
    },
    name: {
        type: String,
        required: true,
    },
    totalSpots: {
        type: Number,
        required: true,
        default:0
    },
    availableSpots:{
        type:Number,
        required:true,
        default:0,
    },
    levels:{
        type:Number,
        required:true
    },
     location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true,
      index:'2dsphere'
    },
  }
});


parkingLotSchema.statics.findByIdCustom = function(id) {
  return this.findOne({ _id: id });
};

const ParkingLot = mongoose.model('parkingLot', parkingLotSchema);

// Service functions


module.exports = { ParkingLot };

