require("dotenv").config()
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const vehicleRoutes = require("./routes/vehicleRoutes");
const parkingLotRoutes = require("./routes/parkingLotRoutes");
const parkingSpotRoutes = require("./routes/parkingSpotRoutes");
const bookingRoutes = require("./routes/bookingRoutes")
require("./config/db-config")
const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use("/api/vehicle", vehicleRoutes);
app.use("/api/parkinglot/", parkingLotRoutes);
app.use("/api/parkingspot/",parkingSpotRoutes);
app.use("/api/booking",bookingRoutes)

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});