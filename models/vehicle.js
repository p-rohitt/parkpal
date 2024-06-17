const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const vehicleSchema = new mongoose.Schema({
    vehicleNo: {
        type: String,
        required: true,
        unique: true
    },
    owner_name: {
        type: String,
        required: true,
    },
    owner_address: {
        type: String,
        required: true
    },
    type:{
        type:String,
        required:true,
        enum:["two","four"]
    }
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);


const getVehicleByVehicleNo = async (vehicleNo) => {
    const vehicle = await Vehicle.findOne({ vehicleNo: vehicleNo }).exec();
    console.log("Fetched", vehicle);
    return vehicle;
};
module.exports={Vehicle, getVehicleByVehicleNo}


