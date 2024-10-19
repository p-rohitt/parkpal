// routes/bookings.js
const express = require('express');
const router = express.Router();
const { createBooking, getBooking, getUserBookings, getParkingLotBookings, updateBookingStatusCtrl, updatePaymentStatusCtrl } = require('../controllers/bookingController'); // Adjust the path as necessary

// Create a new booking
router.post('/', createBooking);

// Get booking by ID
router.get('/:id', getBooking);

// Get bookings by user ID
router.get('/user/:userId', getUserBookings);

// Get bookings by parking lot ID
router.get('/parkingLot/:parkingLotId', getParkingLotBookings);

// Update booking status
router.patch('/:id/status', updateBookingStatusCtrl);

// Update payment status
router.patch('/:id/payment', updatePaymentStatusCtrl);

module.exports = router;
