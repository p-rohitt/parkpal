require("dotenv").config()
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const vehicleRoutes = require("./routes/vehicleRoutes");
const parkingLotRoutes = require("./routes/parkingLotRoutes");
require("./config/db-config")
const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use("/api/vehicle", vehicleRoutes);
app.use("/api/parkinglot/", parkingLotRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});