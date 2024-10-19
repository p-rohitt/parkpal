// controllers/bookingController.js
const { createAdvanceBooking, getBookingById, getBookingsByUserId, getBookingsByParkingLotId, updateBookingStatus, updatePaymentStatus } = require('../models/booking'); // Adjust the path as necessary

const createBooking = async (req, res) => {
    try {
        const { userId, lotId, spotId, startTime, endTime,cost } = req.body;
        const booking = await createAdvanceBooking(userId, lotId, spotId, new Date(startTime), new Date(endTime),cost);
        res.status(201).json(booking);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getBooking = async (req, res) => {
    try {
        const booking = await getBookingById(req.params.id);
        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        res.json(booking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUserBookings = async (req, res) => {
    try {
        const bookings = await getBookingsByUserId(req.params.userId);
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getParkingLotBookings = async (req, res) => {
    try {
        const bookings = await getBookingsByParkingLotId(req.params.parkingLotId);
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateBookingStatusCtrl = async (req, res) => {
    try {
        const booking = await updateBookingStatus(req.params.id, req.body.status);
        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        res.json(booking);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updatePaymentStatusCtrl = async (req, res) => {
    try {
        const booking = await updatePaymentStatus(req.params.id, req.body.paymentStatus);
        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        res.json(booking);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { createBooking, getBooking, getUserBookings, getParkingLotBookings, updateBookingStatusCtrl, updatePaymentStatusCtrl };
