// models/booking.js
const mongoose = require('mongoose');
const { User } = require('./user');
const { ParkingSpot } = require('./parkingSpot');
const { ParkingLot } = require('./parkinglot');
const bookingQueue = require('../queues/bookingQueue');

const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.String,
        ref: 'User',
        required: true
    },
    lotId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ParkingLot',
        required: true
    },
    spotId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ParkingSpot',
        required: true
    },
    startTime: {
        type: Date,
        required: true,
        validate: {
            validator: function(value) {
                return value > Date.now();
            },
            message: 'Start time must be in the future.'
        }
    },
    endTime: {
        type: Date,
        required: true,
        validate: {
            validator: function(value) {
                return value > this.startTime;
            },
            message: 'End time must be after the start time.'
        }
    },
    status: {
        type: String,
        enum: ['active', 'expired', 'cancelled'],
        default: 'active'
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'failed'],
        default: 'pending'
    },
    cost: {
        type: Number,
        required: true,
        min: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Middleware to update the updatedAt field
bookingSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Booking = mongoose.model('Booking', bookingSchema);

// Service functions

const isBookingConflict = async (spotId, startTime, endTime) => {
    const conflictingBookings = await Booking.find({
        spotId: spotId,
        $or: [
            { startTime: { $lt: endTime }, endTime: { $gt: startTime } },
        ],
        status: 'active'
    }).exec();

    return conflictingBookings.length > 0;
};

const createAdvanceBooking = async (userId, lotId, spotId, startTime, endTime, cost) => {
    // Check for conflicts
    const conflict = await isBookingConflict(spotId, startTime, endTime);
    if (conflict) {
        throw new Error('Parking spot is already booked for the desired period.');
    }

    // Create the booking if there is no conflict
    const booking = new Booking({
        userId,
        lotId,
        spotId,
        startTime,
        endTime,
        cost
    });

 

    await booking.save();

    const delay = new Date(endTime) - new Date();
    bookingQueue.add({ bookingId: booking._id }, { delay });
    return booking;
};

const getBookingById = async (bookingId) => {
    const booking = await Booking.findById(bookingId).exec();
    return booking;
};

const getBookingsByUserId = async (userId) => {
    const bookings = await Booking.find({ userId }).exec();
    return bookings;
};

const getBookingsByParkingLotId = async (lotId) => {
    const bookings = await Booking.find({ lotID }).exec();
    return bookings;
};

const updateBookingStatus = async (bookingId, status) => {
    const booking = await Booking.findById(bookingId).exec();
    if (booking) {
        booking.status = status;
        await booking.save();
    }
    return booking;
};

const updatePaymentStatus = async (bookingId, paymentStatus) => {
    const booking = await Booking.findById(bookingId).exec();
    if (booking) {
        booking.paymentStatus = paymentStatus;
        await booking.save();
    }
    return booking;
};

const calculateCost = (startTime, endTime, hourlyRate) => {
    // const hourlyRate = 40; // 40 rupees per hour

    // Calculate the duration in milliseconds
    const durationMs = new Date(endTime) - new Date(startTime);

    // Convert duration from milliseconds to hours
    const durationHours = durationMs / (1000 * 60 * 60);

    // Calculate the cost
    const cost = durationHours * hourlyRate;

    return Math.ceil(cost); // Round up to the nearest whole rupee
};

module.exports = { Booking, calculateCost, createAdvanceBooking, getBookingById, getBookingsByUserId, getBookingsByParkingLotId, updateBookingStatus, updatePaymentStatus };
